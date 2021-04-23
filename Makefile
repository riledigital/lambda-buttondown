.PHONY: clean
clean:
	rm ./function.zip

install:
	npm install
	terraform init

build: index.js clean
	zip -r function.zip node_modules index.js package.json package-lock.json

deploy: build
	aws lambda update-function-code --function-name buttondown-proxy --zip-file fileb://function.zip

destroy:
	terraform destroy -auto-approve

provision: build destroy
	terraform apply -auto-approve