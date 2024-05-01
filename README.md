## Steps :
1. `docker-compose build`
2. `docker-compose up`
###  To create a super admin run the following command :
1. Change directory to backend
2. `cp ./.env.sample ./.env`       
3. `go run seeds/seed.go`
4. Credentials for superAdmin - email :admin@admin.com , password : admin123
5. Credentials for technician - email :suraj@suraj.com , password : suraj123 , 2nd technician - email :suraj1@suraj1.com , password : suraj123
