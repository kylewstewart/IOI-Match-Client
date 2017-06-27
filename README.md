# IOI Match

IOI Match is a simple matching engine that makes it safer for principals to reveal preferences to an agent.

The matching engine has two main design features:
- Anonymous pre-matching
- Reputation Incentives

The steps are:
- To participate a principal must be sponsored by an agent.
- Principals enter indication of interests (IOIs) and a ranked listed of preferred brokers.
- When two or more principal's IOIs match, the details are sent to the most preferred common broker.
- The broker attempts to negotiate a transaction between the principals and communicates the result to the matching engine.
- Each principal involved in a negotiation rates their satisfaction with the agent's negotiation.
- A record is kept of:
  - The percentage of negotiations that resulted in a transaction for each principal and agent.
  - Each agent's average satisfaction rating.

Incentives
- Agents are incentivized to sponsor principals who are willing to transact or risk not be selected as a preferred broker.
- Principals are incentivized to only enter IOIs where they are willing to transact or risk not be sponsored.
- Satisfaction rankings reward agents for acting in the best interest of principals in situations where that might mean not transacting.

# Skateboard

The skateboard will focus on building out the functional features, while many administrative feature will be added to later versions.

The skateboard is based on an implementation for the equity markets and principals will be referred to as Investment Advisors and agents will be Broker Dealers.

# Mockups

![alt text](http://preview.ibb.co/hmT2Hk/Login_Page.png)
![alt text](http://preview.ibb.co/fQjOq5/Broker_s_Page.png)
![alt text](http://preview.ibb.co/mdLeV5/Investment_Advisors_Page.png)
