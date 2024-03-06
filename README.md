# TradeRx

# API Collection

# Read portfolio - GET

<!-- 
curl --location --request GET 'http://localhost:3000/portfolio' \
--header 'Content-Type: application/json' 
-->

# Add Trade - POST

<!-- 
curl --location 'http://localhost:3000/portfolio/addTrade' \
--header 'Content-Type: application/json' \
--data '{
    "tradeId": "65e88cbf970b7579e4b116c9",
    "stockName": "HDFC",
    "type": "BUY",
    "quantity": 300,
    "price": 1500,
    "date": "10/07/2015"
}' 
-->

# Read cumulative return portfolio - GET

<!-- 
curl --location 'http://localhost:3000/portfolio/cumulativeReturn' \
--header 'Content-Type: application/json' 
-->

# Read holdings portfolio - GET

<!-- 
curl --location 'http://localhost:3000/portfolio/holdings' \
--header 'Content-Type: application/json' 
-->

# remove trade - POST

<!-- 
curl --location 'http://localhost:3000/portfolio/removeTrade/65e88cbf970b7579e4b116c9' \
--header 'Content-Type: application/json' \
--data '{
    "tradeId": "65e88cbf970b7579e4b116c9",
    "stockName": "HDFC",
    "type": "BUY",
    "quantity": 300,
    "price": 1500,
    "date": "10/07/2015"
}' 
-->

# update trade - POST

<!-- 
curl --location 'http://localhost:3000/portfolio/updateTrade/65e88cbf970b7579e4b116c9' \
--header 'Content-Type: application/json' \
--data '{
    "tradeId": "65e88cbf970b7579e4b116c9",
    "stockName": "HDFC",
    "type": "BUY",
    "quantity": 300,
    "price": 1500,
    "date": "10/07/2015"
}' 
-->
