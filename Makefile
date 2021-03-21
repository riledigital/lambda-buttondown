clean:
	rm ./function.zip

build: index.js
	zip -r function.zip .

deploy: build
	aws lambda update-function-code --function-name buttondown-proxy --zip-file fileb://function.zip