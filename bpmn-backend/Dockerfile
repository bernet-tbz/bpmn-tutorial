FROM java:8
MAINTAINER Marcel Bernet <marcel.bernet@tbz.ch>

COPY target/bpmn-service-1.0-SNAPSHOT-jar-with-dependencies.jar /opt/bpmn-service.jar

EXPOSE 8090

CMD java -jar /opt/bpmn-service.jar