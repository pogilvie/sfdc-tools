
target = peter

run:
	bun main.ts 

screen:
	bun screen.ts

creds:
	sf org display -o $(target) --json > creds.json

