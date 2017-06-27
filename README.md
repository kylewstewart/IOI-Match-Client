# IOI Match

IOI Match is a simple matching engine that makes it safer for principals to reveal preferences to an agent.

The matching engine accomplishes this with two main design features:
- Anonymous pre-match
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
