.PHONY: init run-dev
init:
	npm run build

run-dev:
	npm run dev

.PHONY: design-tools
design-tools:
	npx --yes impeccable@4.11.0 install --providers=codex --scope=project --yes
