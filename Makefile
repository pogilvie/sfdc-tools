
target = peter

run:
	bun main.ts --version
	bun main.ts --help

creds:
	sf org display -o $(target) --json > creds.json

