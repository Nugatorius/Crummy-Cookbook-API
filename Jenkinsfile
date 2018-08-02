pipeline {
    agent {
        docker {
            image 'node:8' 
            args '-p 3000:3000 -u 0:0' 
        }
    }
    stages {

        stage('Checkout') {
            steps{
                echo 'Getting source code...'
                checkout scm                
            }
        }

        stage('Build') {
            steps {
                echo 'Building dependencies...'
                sh 'echo whoami'
                sh 'npm i'
            }
        }

        stage('Test') {
            steps {
                echo 'Node Testing...'
            }
        }
    }
}
