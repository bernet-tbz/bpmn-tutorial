def  appName = 'bpmn'
def  feSvcName = "${appName}-frontend"
def  imageTag = "misegr/${feSvcName}-frontend:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

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
      		when { branch 'master' }        	
            steps {
            		unstash 'jar'
            		sh("cd bpmn-frontend/ && /usr/bin/docker build -t misegr/bpmn-frontend .")
            		sh("cd bpmn-backend/  && /usr/bin/docker build -t misegr/bpmn-backend .")
                  }
        }
        stage('Deploy Images') { 
        	agent any
      		when { branch 'master' }        	
            steps {
                    sh("-c (test -d misegr && rm -rf misegr)")     
                    sh("git clone https://github.com/mc-b/misegr.git")     
            		sh("kubectl apply -f misegr/bpmn")
                  }
        }
        stage('Build Branch Images') { 
        	agent any
		    when { 
		       		not { branch 'master' } 
		       		not { branch 'canary' }
		    	 }        	
            steps {
            		unstash 'jar'
            		sh("cd bpmn-frontend/ && /usr/bin/docker build -t misegr/bpmn-frontend:${env.BRANCH_NAME}.${env.BUILD_NUMBER} .")
            		sh("cd bpmn-backend/  && /usr/bin/docker build -t misegr/bpmn-backend:${env.BRANCH_NAME}.${env.BUILD_NUMBER} .")
                  }
        }
        stage('Deploy Branch Images') { 
        	agent any
		    when { 
		       		not { branch 'master' } 
		       		not { branch 'canary' }
		    	}        	
            steps {
                    sh("-c (test -d misegr && rm -rf misegr)")     
                    sh("git clone https://github.com/mc-b/misegr.git")     
          			sh("sed -i 's#latest#${env.BRANCH_NAME}.${env.BUILD_NUMBER}#' misegr/bpmn/*.yaml")
          			sh("kubectl apply -f misegr/bpmn")            
                  }
        }        
    }
}
