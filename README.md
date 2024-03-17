# Industry track

## EasyPass - Distributed E-Ticketing System

## About the project
## Implemented components:
Detailed description of the system architecture (Application-specific system components):
- System must have at least three nodes (e.g, containers)
- Each node must have a role: client, server, peer, broker, etc.

Participating nodes must:
- Exchange information (messages): RPC, client-server, publish/subscribe, broadcast, streaming, etc.
- Log their behavior understandably: messages, events, actions, etc.


Nodes (or their roles) do not have to be identical
For example, one acts as server, broker, monitor / admin, etc.
Each node must be an independent entity and (partially) autonomous


Detailed descriptions of relevant principles covered in the course (architecture, processes, communication, naming, synchronization, consistency and replication, fault tolerance); irrelevant principles can be left out.

## Built with:
Detailed description of the system functionality and how to run the implementation 

- If you are familiar with a particular container technology, feel free to use it (Docker is not mandatory)
- Any programming language can be used, such as: Python, Java, JavaScript, ..
- Any communication protocol / Internet protocol suite can be used: HTTP(S), MQTT, AMQP, CoAP, ..

## Getting Started:
Instructions on setting up your project locally


## Results of the tests:

### Selected criteria

#### Latency

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

#### Throughput

Throughput assesses the volume of transactions processed within a given timeframe. Similar to latency, complex endpoints, such as "Refund Payment" and "Purchase Ticket," show lower throughput values, whereas other endpoints tend to display comparatively higher throughput values.

|Endpoint | Through put (messages/s)|
|----------------|----------|
|Add Event       | 1.6      |
|Login           | 2.9      |
|Purchase Ticket | 1        |
|Refund Payment  | 0.97     |
|Register        | 1.6      |
|View Event      | 1.4      |

### Evaluation Scenarios

#### Load Testing 

Single user and multiple users



Collect numerical data of test cases:
- Collecting logs of container operations
- Conduct simple analysis for documentation purposes (e.g. plots or graphs)
![Latency 1 user](<resources/images/latency 1 users.jpg>)

## Acknowledgments:


