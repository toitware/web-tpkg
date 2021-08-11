pipeline {
    agent {
      kubernetes {
        defaultContainer 'webtemplate'
        yamlFile 'Jenkins.pod.yaml'
      }
    }

    environment {
        GITHUB_TOKEN = credentials('leon-github-npm')
    }
    options {
      timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage("install") {
            steps {
                sh 'npm config set //npm.pkg.github.com/:_authToken=$GITHUB_TOKEN'
                sh "yarn install"
            }
        }

        stage("lint") {
            steps {
                sh "yarn lint"
            }
        }

        stage("build") {
            steps {
                sh "yarn build"
            }
        }

        stage("upload") {
            when {
                anyOf {
                    branch 'master'
                    branch pattern: "release-v\\d+.\\d+", comparator: "REGEXP"
                    tag "v*"
                }
            }

            steps {
                sh "tar -zcf build_${BUILD_VERSION}.tgz -C build/ ."
                withCredentials([[$class: 'FileBinding', credentialsId: 'gcloud-service-auth', variable: 'GOOGLE_APPLICATION_CREDENTIALS']]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh "gcloud config set project infrastructure-220307"
                    sh "toitarchive build_${BUILD_VERSION}.tgz toit-web pkg.toit.io ${BUILD_VERSION}"
                }
            }

            post {
                always {
                    sh "make clean"
                }
            }
        }
    }
}
