<h2 id="task"> Module 1 Task Overview </h2>
<p>Interface with a stock price data feed and set up your system for analysis of the data</p>
<p> <b>Aim:</b> We want to process the data feed of stock A and stock B’s price to enable us to analyse when trading for the stock should occur.</p>

<ol>
	<li>Please clone this repository to start the task</li>
	<li>Adjust the getRatio, getDataPoint and main functions</li>
	<li>Bonus: Pass all unit tests and add more to cover edge cases</li>
	<li>Upload a git patch file as the submission to this task</li>
	
</ol>

<h2>How to Run</h2>
To start the server, run

	python server3.py

this will create random market called 'test.csv' in your working directory if one does not already exist.

If you encounter an issue with `datautil.parser`, run this command: 

	pip install python-dateutil

To start the example client, run:

	python client3.py

To unit test the example client, run:

	python client_test.py

<h2>How to request from the server using curl</h2>
Query:

	$ curl 'http://localhost:8080/query?id=1'
	{"id": "1", "top_ask": {"price": 129.18, "size": 70}, "timestamp": "2016-08-06 12:32:11.821574", "top_bid": {"price": 128.79, "size": 61}}

