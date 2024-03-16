
target = peter

run:
	bun main.ts 

creds:
	sf org display -o $(target) --json > creds.json

