pipeline {
    agent {
      kubernetes {
        defaultContainer 'webtemplate'
        yamlFile 'Jenkins.pod.yaml'
      }
    }

    options {
      timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage("install") {
            steps {
                sh "yarn install"
            }
        }

        stage("lint") {
            steps {
                sh "yarn lint"
            }
        }

        stage("test") {
            steps {
                sh "yarn test:jenkins"
            }
            post {
                always {
                    junit "junit.xml"
                }
            }
        }

        stage("build") {
            steps {
                sh "yarn build"
            }
        }
    }
}
