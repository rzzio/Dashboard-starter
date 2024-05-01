## Steps :
1. `docker-compose build`
2. `docker-compose up`
###  To create a super admin run the following command :
1. Set DB_HOST inside /backend/.env to your local network ip. Example : 192.168.1.69
2. Change directory to backend
2. `go run seeds/seed.go`
3. Credentials for superAdmin - email :admin@admin.com , password : admin123
