### Nodejs with express
## test
# branch test2




    - stage: deploy to staging
        deploy: &heroku
        provider: heroku
        app: lesson-5-staging
        script:
          - docker build -t vit134/node-web-app .
          - docker run -p 3000:3000 -d vit134/node-web-app
        on:
          branch: git-vis


          - stage: lint
                script:
                  - npm run lint
                  - npm run style-lint