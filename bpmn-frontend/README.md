BPMN HTML5/JavaScript Frontend
------------------------------

Vereinfachte Implementierung eines BPMN Frontends, mit Anleihen von [TodoMVC](http://todomvc.com/).

Das Frontend ist in HTML5 mit JavaScript, ohne Verwendung von NodeJS, implementiert.

### Verzeichnisstruktur

* src/app - Applikationsdateien
* src/css - Stylesheets
* src/modules - Fremde Module wie jquery und fittextjs
* WEB-INF/web.xml -  Deployment Descriptor, Beschreibt die Anwendung
* index.html - Startseite

### Installation

Die Dateien inkl. Stammverzeichnis sind in das TomCat webapps Verzeichnis der Camunda BPM Engine zu kopieren:

	server\apache-tomcat-8.0.24\webapps
	
und können dann mittels [http://localhost:8080/bpmn-frontend/](http://localhost:8080/bpmn-frontend/) aufgerufen werden.

Mittels des `+` Buttons kann ein neuer Rechnungsprozess, basierend auf [RechnungStep3.bpmn](../RechnungStep3.bpmn), gestartet werden. Rechnungs-Nummer und Betrag werden dabei mit übergeben.

### Fehler: Access-Control-Allow-Origin

Wird erzeugt wenn der Prozess ausserhalb von localhost:8080 gestartet wird, z.B. direkt ab dem Dateisystem.

Weitere Infos dazu sind auf [Cross-Origin Resource Sharing (CORS)](https://de.wikipedia.org/wiki/Cross-Origin_Resource_Sharing) zu finden.