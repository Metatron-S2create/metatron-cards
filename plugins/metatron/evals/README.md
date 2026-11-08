# Routing evals

Real Claude Code sessions with the plugin loaded: each case is one request, and the graders check which Metatron skill Claude opened (and which it must not open). Run from the plugin folder:

```
claude plugin eval . --tag routing --ablation none --trust-plugin
```

The Metatron connector is not started in these runs, so each skill stops after it loads; only the routing is measured. The server router's own 298 cases run in the connector's tests.
