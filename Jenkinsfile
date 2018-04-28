pipeline {
    agent none
    stages {
        stage('Build') {
		    agent {
		        docker {
		            image 'maven:3-alpine'
		            args '-v /root/.m2:/root/.m2'
			    }
		    }         
            steps {
                sh 'cd bpmn-backend/ && mvn -B -DskipTests clean package'
                archiveArtifacts 'bpmn-backend/target/*.jar'
                stash includes: 'bpmn-backend/target/*.jar', name: 'jar'
            }
        }
        stage('Build Images') { 
        	agent any
            steps {
            		unstash 'jar'
            		sh 'cd bpmn-frontend/ && /usr/bin/docker build -t misegr/bpmn-frontend .'
            		sh 'cd bpmn-backend/  && /usr/bin/docker build -t misegr/bpmn-backend .'
                  }
        }
    }
}
