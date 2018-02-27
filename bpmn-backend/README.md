BPMN Java Backend
-----------------

Basierend auf [Java SE 8: Creating a Basic REST Web Service using Grizzly, Jersey, and Maven](http://www.oracle.com/webfolder/technetwork/tutorials/obe/java/griz_jersey_intro/Grizzly-Jersey-Intro.html#overview).

### Projekt erzeugen

	mvn archetype:generate -DarchetypeArtifactId=jersey-quickstart-grizzly2 -DarchetypeGroupId=org.glassfish.jersey.archetypes -DinteractiveMode=false -DgroupId=ch.tbz.bpmn.rest -DartifactId=bpmn-backend -Dpackage=ch.tbz.bpmn.backend -DarchetypeVersion=2.17

Weil der Port 8080 bereits durch Camunda belegt ist, muss in der Datei `ch.tbz.bpmn.backend.Main.java` die Konstante `BASE_URI` angepasst werden.

    // Base URI the Grizzly HTTP server will listen on
    public static final String BASE_URI = "http://localhost:8090/myapp/";
  
#### Testen

	mvn clean compile
	mvn exec:java
	
Browser aufrufen und folgenden URL eingeben: [http://localhost:8090/myapp/application.wadl](http://localhost:8090/myapp/application.wadl)
	
	
### Javaklasse um BPMN Aufruf abzuhandeln

Um den BPMN Aufruf abzuhandeln ist das Beispiel um eine Klasse [RechnungBackend](src/main/java/ch/tbz/bpmn/backend/RechnungBackend.java) zu erweiteren.

Die Klasse ist als REST Backend implementiert, welche einen HTTP POST mit den Feldern im JSON Format entgegennimmt.

Sie besteht aus einer Hilfklasse (POJO) um die Argumente entgegenzunehmen

    @XmlRootElement
    public static class FormData
    {
        @XmlElement
        public String rnr;
        @XmlElement
        public String rdatum;
        @XmlElement
        public String rbetrag;
    }
    
Und der eigentlichen Methode, welche den HTTP POST Aufruf abhandelt:

    @POST
    @Path( "zahlen/" )
    public Response zahlen( FormData data )
    {
    	// Abhandlung
        return  ( Response.status(  200 ).build() );
    }

Die Klasse kann wie folgt getestet werden:

	curl -X POST -H "Content-Type: application/json" -d '{ "rnr": "1", "rbetrag": "200" }' localhost:8090/myapp/rechnung/zahlen
	
### Eine .JAR Datei erstellen (optional)

Dazu ist die Datei `pom.xml` um folgende Einträge zu ergänzen:

	<plugin>
	    <groupId>org.apache.maven.plugins</groupId>
	    <artifactId>maven-assembly-plugin</artifactId>
	    <configuration>
	        <descriptorRefs>
	            <descriptorRef>jar-with-dependencies</descriptorRef>
	        </descriptorRefs>
	        <finalName>bpmn-service-${project.version}</finalName>
	        <archive>
	            <manifest>
	                <mainClass>ch.tbz.bpmn.backend.Main</mainClass>
	            </manifest>
	        </archive>
	    </configuration>
	    <executions>
	        <execution>
	            <phase>package</phase>
	            <goals>
	                <goal>single</goal>
	            </goals>
	        </execution>
	    </executions>
	</plugin>  
	<plugin>
	    <groupId>org.apache.maven.plugins</groupId>
	    <artifactId>maven-dependency-plugin</artifactId>
	    <version>2.4</version>
	    <executions>
	        <execution>
	            <id>copy-dependencies</id>
	            <phase>package</phase>
	            <goals><goal>copy-dependencies</goal></goals>
	        </execution>
	    </executions>
	</plugin> 
	
Testen mittels

	mvn clean package
	java -jar target/bpmn-service-1.0-SNAPSHOT-jar-with-dependencies.jar	
	
### Docker Image erstellen (optional)

Um den Port 8090 ausserhalb des Containers sichtbar zu machen, in der Datei `ch.tbz.bpmn.backend.Main.java` die Konstante `BASE_URI` anpassen.

    // Base URI the Grizzly HTTP server will listen on
    public static final String BASE_URI = "http://0.0.0.0:8090/myapp/";

.JAR Datei wie oben beschrieben erstellen.

`Dockerfile` mit folgendem Inhalt erstellen:

	FROM java:8
	COPY target/bpmn-service-1.0-SNAPSHOT-jar-with-dependencies.jar /opt/bpmn-service.jar
	EXPOSE 8090
	CMD java -jar /opt/bpmn-service.jar
	
Docker Image builden:

	docker build -t bpmn-backend .

Docker Image als Container starten:

	docker run --rm -p 8090:8090 --name bpmn -it bpmn-backend

### Kubernetes (optional)

Docker Image wie oben erstellen.

`bpmn-backend.yaml` mit Service und Deployment erstellen. `replicas` festlegen, z.B. 3.

	kubectl create -f bpmn-backend.yaml

Testen mittels

	minikube service bpmn-backend

Um die Service Beschreibung (REST-Service) zu sehen ist dem URL `/myapp/application.wadl` hinten an zu stellen.

