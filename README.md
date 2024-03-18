╔═══╗╔═══╗╔═══╗╔╗  ╔╗    ╔═══╗╔═══╗╔═══╗╔═══╗
║╔══╝║╔═╗║║╔═╗║║╚╗╔╝║    ║╔═╗║║╔═╗║║╔═╗║║╔═╗║
║╚══╗║║ ║║║╚══╗╚╗╚╝╔╝    ║╚═╝║║║ ║║║╚══╗║╚══╗
║╔══╝║╚═╝║╚══╗║ ╚╗╔╝     ║╔══╝║╚═╝║╚══╗║╚══╗║
║╚══╗║╔═╗║║╚═╝║  ║║      ║║   ║╔═╗║║╚═╝║║╚═╝║
╚═══╝╚╝ ╚╝╚═══╝  ╚╝      ╚╝   ╚╝ ╚╝╚═══╝╚═══╝


# 🔴 Distributed E-Ticketing System 🔴 

## About the project

The EasyPass" distributed E-ticketing system is a  platform made to make managing and selling event tickets easier. It consists of several microservices, each in charge of certain functions including order processing, user authentication, and event catalogue maintenance. The system guarantees security, scalability, and dependability while enabling users to peruse, buy, and manage tickets for a range of occasions.

In real-world scenarios, websites often experience downtime during events due to high traffic. Easy Psss was designed to tackle this issue by utilizing distributed computing techniques to enhance service reliability. The system consists of distributed, scalable components as a frontend, API gateway, and backend microservices across three node tiers. For the implementation, kubernetes was used as the container orchestration service. Evaluation of effectiveness involved comparing performance metrics for different scenarios
and analyzing numerical data from test cases in later stages.

Group Details: 
- [x]  Kavindu Wijesinghe - Kavindu.WijesingheArachchilage@student.oulu.fi
- [x]  Nirasha Thennakoon - Nirasha.KaluarachchiThennakoonAppuhamilage@student.oulu.fi
- [x]  Sonali Prasadika - Sonali.LiyanaBadalge@student.oulu.fi
- [x]  Iresh Jayasundara - Iresh.JayasundaraMudiyanselage@student.oulu.fi

## Implemented components
### Detailed description of the system architecture (Application-specific system components):

#### High Level System Architecture 
![alt text](https://github.com/Death-RAW/sd2des_example/assets/61182412/3673ad1d-b5f6-4e21-8d9a-4117d2a99b68) figure : High Level System Architecture 

## Application-specific system components
- User and DNS resolver- These entities will act external to the system

### Node 1 :
- Load balancer - Direct the HTTPS request to frontend instances considering the current traffic.

- Instances - Frontend instances will be the customer face and has the ability to scale up or down with the incoming traffic

- API Gateway - Central point of the API endpoints and will handle the initial required authentication, conversions and gateway level logic

### Node 2 :

- Authentication Microservice - Ensures secure access to the platform by verifying user identities and authorizing access to protected resources, safeguarding user data and system integrity. Functionalities include user authentication and authorization, password management, and session management

- Event Catalog Microservice - Facilitates event discovery for users, driving engagement and ticket sales by offering a comprehensive view of available events. Functionalities include managing catalog of events, providing information on upcoming events, schedules, and venue details.

- Ticketing Microservice - Handles the ticket management, ensuring efficient allocation and sale of tickets. Functionalities include managing ticket inventory, availability, reservations, and sales.

- Payment Microservice - Ensures secure and reliable payment transactions, Handles payment processing, including gateway integration, and error handling.

- Order Management Microservice - Facilitates smooth and efficient order processing, Manages order lifecycle, including creation, modification, cancellation, and fulfillment.

### Node 3 :
- Database - Repository for storing and managing critical data related to users, events, tickets, orders, payments, and other essential information.
________________________________________________________________________________
![alt text](https://github.com/Death-RAW/sd2des_example/assets/61182412/111f4dcd-e9b5-4770-bb41-ac61f56a94da)
Figure : Simplyfied event flow
## Principles covered in the course
### Architecture : Service-Oriented Architecture
[Misco Services](https://microservices.io/) has been used to implement the project following the [Service Oriented Architecture](https://collaboration.opengroup.org/projects/soa-book/pages.php?action=show&ggid=1314). The microservice architecture enables an organization to deliver large, complex applications rapidly, frequently, reliably, and sustainably. More details about the microservices can be found [here](https://microservices.io/). 

Based on the microservice architecture, Distributed-E-Ticketing Easy Pass system implements five main services: user service, ticketing service, event service, order management service, and payment service.

- User-service - managing user related functionalities
- Ticketing service - managing ticket reservation, availability etc
- Event service - handle event related functionalities
- Order management service - manage orders
- Pyament service - handle payement requests like purchases, refunds
 
### Communication : REST APIs with HTTP
#### API Endpoints:

The Easy Pass defines several API endpoints using HTTP methods such as POST, GET, PUT, and DELETE. For example:
- /api/event (POST): Creates a new event.
- /api/events (GET): Retrieves all events.
- /api/event/:id (GET): Retrieves a specific event by its ID.
- /api/event/:id (PUT): Updates a specific event by its ID.
- /api/event/:id (DELETE): Deletes a specific event by its ID.

These endpoints function as communication channels through which clients can communicate with the server to perform CRUD operations on events.
The communication between services is handled using Representation State Transfer  ([REST](https://www.codecademy.com/article/what-is-rest)) over HTTP. By defining clear API endpoints, following the request-response cycle, transferring data in [JSON](https://www.json.org/json-en.html) format, and handling errors effectively, the codebase ensures seamless communication between clients and servers, facilitating the exchange of information and enabling the implementation of various features in the application.
 
### Naming
Each and every endpoint expose from the API gateway is named using [URI](https://www.w3.org/Addressing/).

#### Descriptive Route Names have been used
The route names in the services-routes.js files are descriptive and reflect the actions they perform. For example, /payment is used for processing payments, and /payment/:id/refund is used for initiating refunds. This will  help to understand the purpose of each route quickly.

#### Celar Resource Identification used:
The use of parameters in route paths, such as :id in /payment/:id/refund, follows RESTful principles for resource identification. This allows for identifying specific resources (e.g., payments) using unique identifiers (IDs) in the URI. By doing this, code is predictable to utilize in the distributed system.

#### Modular Organization of routes and controllers:
The separation of concerns between routes and controllers provides modular organization. Each file, such as payment-routes.js and paymentController.js ext., focuses on a specific aspect of the application (routing and business logic, respectively), promoting clarity and maintainability. This modular structure aligns with the principles of microservice architecture, where components are decoupled and independently deployable.

#### Consistent Naming Conventions:
The system follows consistent naming conventions throughout. For instance, camelCase is used for variable and function names (processPayment, refundPayment), which is a common convention in JavaScript development. Consistency in naming conventions helps in reducing cognitive load for developers and ensures uniformity across the codebase.
Example :
/purchaseTicket - the enpoint which allows to buy tickets
/login - the endpoint which can be used to login to the system

Controller function Names:
The controller function names such as processPayment and refundPayment in the paymentController.js file are an example, and they are also descriptive and self-explanatory. These clearly indicate the actions they perform, which is according to the Single Responsibility Principle (SRP) by focusing on a specific task 

### Fault Tolerance
In a EasyPass, fault tolerance is crucial to ensure uninterrupted service despite failures in individual components. 

#### Redundancy in EasyPass:

Database Replication: As mentioned earlier, the system employs database replication to maintain multiple copies of data across different nodes or replicas. If one database node fails, the system can seamlessly switch to another replica, ensuring data availability and continuity of service.
Service Redundancy: Critical services such as payment processing, order management, and user authentication are deployed redundantly across multiple servers or containers. If one instance fails, traffic can be rerouted to the redundant instances, minimizing service disruption.

#### Load Balancing:

At a high level, the EasyPass utilizes a load balancer, specifically Nginx, to efficiently manage incoming internet traffic. Nginx acts as the gateway, directing requests to multiple instances of a React frontend application. These instances are dynamically scaled based on traffic thresholds using a provided script. Once traffic reaches a certain stage, it's routed through the API gateway for authentication and onward redirection to backend microservices. This load balancing approach ensures optimal resource utilization, scalability, and reliability for the entire system.


## Built with:
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)

![HTTP](https://img.shields.io/badge/HTTP-blue)

![Static Badge](https://img.shields.io/badge/JMeter-blue)

### Functionalities Overview:

#### User Management:
- The system has two types of users: "Guest Users" and "Admin Users".
- Guest Users can browse available events but need to register to reserve tickets.
    - /register: Register a new user.
    - /login: User login endpoint.

#### Event Management:
- Guest Users can view all registered events.
    - /viewEvents: Retrieve all registered events.
- Admin Users can add, delete, or modify events.
    - /addEvents: Add a new event.
    - /deleteEvents: Delete an existing event.
    - /updateEvents: Modify an existing event.

#### Ticket Management:
- Admin Users can manage tickets for events.
    - /addTicketsToEvent: Add tickets to an event.
    - /updateTickets: Update ticket details.
    - /deleteTickets: Delete tickets from an event.
- Users can check ticket availability.
    - /ticketAvailability: Retrieve available ticket count.

#### Payments:
- Users can reserve and pay for tickets using the system.
    - /purchaseTicket: Reserve and pay for tickets.
- Users can also request refunds for their payments.
    - /refundPayment: Process refund requests.

#### Order Management:
- Upon successful payment, order details are sent to the user.

#### Authentication and Authorization:
- The system uses JWT-based authentication. Users need to log in to perform certain actions, and there's middleware to handle authentication (authMiddleware).

#### Ticket Reservation:
   - Users can reserve tickets for events (reserveTickets function). The system checks ticket availability and reserves tickets accordingly.

#### Payment Processing:
   - After ticket reservation, the system processes payments (processPayment function). It associates the payment with the user and the order.

####  Order Management:
   - Once payment is processed, the system manages the order (manageOrder function). This likely includes updating the status of the order and associating it with the user and the purchased tickets.

#### Refund Handling:
   - Admins can initiate refunds (/refundPayment endpoint). This involves updating the payment status and potentially releasing reserved tickets.

#### User Management:
   - Users can register (/register endpoint) and log in (/login endpoint). Admins are differentiated and have additional privileges.

#### Event Management:
   - Admins can add, update, and delete events (/addEvent, /updateEvent, /deleteEvent endpoints). They can also manage tickets associated with events.

#### Ticket Management:
   - Admins can add, update, and delete tickets (/addTicketsToEvent, /updateTickets, /deleteTickets endpoints). They can also view ticket availability for events (/ticketsAvailability endpoint).

#### Viewing Events:
   - Users can view available events (/viewEvents endpoint).

#### Error Handling:
- The system provides appropriate error messages and handles internal errors gracefully.

#### Communication with Microservices:
- The API gateway communicates with various microservices (user, ticketing, payment, event, order management) to perform actions. It abstracts away the complexities of direct communication with these services.
## Getting Started:

### Locally install

The given GitHub repository contains all the necessary files for building the EasyPass application. The repository includes two directories: FEbrifge (FrontEnd Bridge) and Services. Both directories represent the two nodes of the system. Additionally, the Firebase database serves as the third node for storage. The application code is implemented with a focus on hosting it in an AWS-based Linux environment.

To initiate the deployment process, two EC2 instances will be required for the two directories in the repository:

- Node 1 (Instance 1) - Load Balancer, Multiple Frontend Instances, and API Gateway
- Node 2 (Instance 2) - 5 microservices
- Node 3 - Firebase database

### Services deployment on Instance 2

The EasyPass application backend consists of 5 Node.js services: Auth-service, event-catalog-service, order-management-service, payment-service, and ticketing-service. While ideally each microservice can operate on separate nodes/machines, resource constraints dictate that all five services will be deployed on a single EC2 instance. To ensure availability, pm2 is utilized as the service manager.

Clone the repository
```bash
Git clone https://github.com/Shazam007/Distributed-E-Ticketing.git
```
cd into the Services directory
```bash
cd ./Distributed-E-Ticketing/Services  
```
Give permission to run the automation script service_runner.sh
```bash
chmod +x service_runner.sh
```

Run the service_runner.sh
```bash
./service_runner.sh
```

Accept the console pop ups to uninterrupted install

At the end of the script, all 5 services will be running on ports (3001,3002,3003,3004,3005)

To see the running service list, use
```bash
Pm2 list 
```

Make sure to add those ports to the security group to accept the traffic from other instance (Add that instances IP as the source). 

### Load Balancer, Frontend, and API Gateway deployment on Instance 1

To direct traffic from the internet to the frontend applications and evenly distribute it among them, Nginx serves as the server. The frontend is a React application built with Vite, and initially, the provided script can be employed to create two application copies on different ports, functioning as two hosts. The script possesses the ability to scale up or down (adding more frontend instances) the React application based on traffic compared to a selected threshold. In the final stage of this node, the traffic will be routed to the API gateway. From there, all requests will undergo authentication and be redirected to the relevant services, serving as a bridge between frontend and backend microservices.

Clone the repository
```bash
Git clone https://github.com/Shazam007/Distributed-E-Ticketing.git
```

Setup Nginx

cd into the Nginx directory
```bash
cd ./Distributed-E-Ticketing/FEBridge/Nginx 
```

First add the instances’s self IP to server_name 
Ex: server_name 54.167.30.104

Run the script to install and configure nginx
```bash
./setup_nginx.sh
```

Configurations aim to route the traffic to the initializing frontend services in next steps. Also open the TCP 80 port in security groups to accept the incoming HTTP traffic.

Setup Frontend services

cd into the FE directory
```bash
cd ./Distributed-E-Ticketing/FEBridge/FE 
```

Run the script ./setup_frontend.sh
```bash
./setup_frontend.sh
```

This will spin up two frontend applications on ports 3001 and 3002, along with a pm2 service to monitor the instance traffic for scaling up or down the instances. The script is designed to duplicate the directory (or delete if scaling down), assign an available port to the application, and then add it to the load balancing roster of the Nginx server.


### Setup API-gateway

As the last component in the node, the API-gateway needs to initiate.

cd into the FE directory
```bash
cd ./Distributed-E-Ticketing/FEBridge/EasyPass-api-gateway
```

Run the script ./setup_gateway.sh
```bash
./setup_gateway.sh
```

Make sure to add the other instance’s (node with all microservices) IP to the .env to build the communication. 

## Results of the tests: Evaluation

### Latency

[NN group](https://www.nngroup.com/articles/response-times-3-important-limits/) , and this [research artical](https://www.researchgate.net/publication/228553434_System_Response_Time_and_User_Satisfaction_An_Experimental_Study_of_Browser-based_Applications) have shown that user attention and satisfaction can significantly drop if a task exceeds the approximate 10-second threshold. This is the point at which users begin to lose focus and may consider leaving the process. This effect is particularly considered on e-commerce and ticketing platforms.

Simple endpoints, such as "Add Event," "Login," and "View Event," typically involve straightforward database queries or minor processing, leading to lower latency. Conversely, complex endpoints, like "Refund Payment," and "Purchase Ticket," involve multiple steps, internal service calls, and more intensive database operations, thereby justifying higher latency.

|Endpoint | Latency (ms) |
|----------------|---------|
|Add Event       | 581     |
|Login           | 625     |
|Purchase Ticket | 978     |
|Refund Payment  | 1031    |
|Register        | 350     |
|View Event      | 626     |

### Throughput

Throughput assesses the volume of transactions processed within a given timeframe. Similar to latency, complex endpoints, such as "Refund Payment" and "Purchase Ticket," show lower throughput values, whereas other endpoints tend to display comparatively higher throughput values.

|Endpoint | Throughput (messages/s)|
|----------------|----------|
|Add Event       | 1.6      |
|Login           | 2.9      |
|Purchase Ticket | 1        |
|Refund Payment  | 0.97     |
|Register        | 1.6      |
|View Event      | 1.4      |

### Load Testing 

Load testing enables the evaluation of how the application performs under heavy loads. This includes understanding how quickly the system responds to requests, which is vital for user satisfaction and retention. For our project, we conducted two types of load testing: initially with just one user, and subsequently with 10 concurrent users. The single-user test helped us observe how the system operates under optimal conditions. Following this, we introduced 10 users to more accurately simulate real-life usage and identify any issues that arise when the system is used by multiple people simultaneously. This approach helped us determine whether our project can efficiently handle multiple users without encountering problems.

|Endpoint | Throughput (messages/s) (1 Users) | Latency (ms) (1 Users) | Avarage Throughput (messages/s) (10 Users)  |Avarage Latency (ms) (10 Users)|
|----------------|----------|--------|-------|---------|
|Add Event       | 1.6      |581     |1.1    |429.2    |
|Login           | 2.9      |625     |1.1    |379.6    |
|Purchase Ticket | 1        |978     |1      |860.8    |
|Refund Payment  | 0.97     |1031    |1      |1047.8   |
|Register        | 1.6      |350     |1.1    |843.5    |
|View Event      | 1.4      |626     |1      |127.2    |  

### Results and Analysis

### Latency

The difference in latency between single-user and multi-user scenarios varies. We cannot definitively state that multi-user scenarios always exhibit higher latency. Endpoints involving complex transactions or database writes tend to demonstrate increased latency under load, aligning with expectations.

  ![l1](https://github.com/Death-RAW/sd2des_example/assets/61182412/4b1eec43-ea23-43ec-9c31-636fded4d0a6)
![l2aqv](https://github.com/Death-RAW/sd2des_example/assets/61182412/8953fbe3-6eab-4bfc-b024-731022bc3fbd)

### Throughput

The difference in throughput between single-user and multi-user scenarios shows some deviations, meaning that single-user scenarios exhibit higher throughput than multi-user scenarios. This is an expected scenario, as the number of users increases, the number of messages processed within a given time decreases.

![tp1](https://github.com/Death-RAW/sd2des_example/assets/61182412/14a90249-c657-4376-a6f1-0cdba76921d1)
![tp2ac](https://github.com/Death-RAW/sd2des_example/assets/61182412/8bcdd5ff-4b46-4acf-9ebf-007e94a2b42e)



## Acknowledgements

This project was carried out as a requirement for the course 521290S Distributed Systems in Faculty of ITEE of University of Oulu. All the work was carried out under the instructions of the respective lecturers of the course. 

 - [JMeter](https://jmeter.apache.org) : used for testing purposes
 - [PostMan](https://www.postman.com) : used for testing purposes
