# backend

## Connection to PosgreSQL
In the application.properties we need to provide a username, password pair to maintain the connection to the database. For testing purpose use the below data:
```properties
    spring.datasource.username=szasz_lillae_gmail_com
    spring.datasource.password=wdbZvXl8gJFpzMuV
```
## Run config
There are two different ways to set up your configuration to run the server in dev mode in IntelliJ IDEA:
- Add `-Dspring.profiles.active=dev` to VM Options
    (`Run`>`Edit Configurations`>`Environment`>`VM Options`)
- Set `dev` as an active profile
    (`Run`>`Edit Configurations`>`Spring Boot`>`Active profiles`)
