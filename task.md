#### Build UI app that uses [Streamflow’s SDK](https://github.com/streamflow-finance/js-sdk/) and interacts with the Streamflow Distributor Protocol and API and enables users to view and claim Streamflow Airdrops.

# Requirements:

- Create permissionless airdrop(s) using Streamflow App
- User can use Phantom wallet (browser extension) to interact with the app.
- Display airdrop parameters: (User should be able to enter Airdrop ID to see them)
  - Type (Vested/Instant)
  - Number of recipients (claimed/total)
  - Amount in tokens (claimed/Total)
  - Logged-in user amount
- Allow user to claim (if eligible and has amount available to claim).

# Bonus points:

- Display $ values next to token values.
- Instead of entering Airdrop ID, allow user to see all Airdrops and click on one to see the details.

# Technical requirements:

- Use React + Typescript
- Work with devnet program (it’s free!)
- Write clean and well-structured code

# Hints:

- Use https://github.com/streamflow-finance/js-sdk.
- Use [js-sdk docs](https://js-sdk-docs.streamflow.finance/).
- Use public API docs ([mainnet](https://api-public.streamflow.finance/v2/docs), [devnet](https://staging-api-public.streamflow.finance/v2/docs)).
- Use public guide for [automated airdrop creation](https://streamflow.notion.site/Public-Automated-Airdrop-Creation-45b84bfd2dda4d7196be5dd02eed29c8?pvs=21).
- Do not focus on design too much.
- Make sure you understand the concepts - Wallet, Solana account, Token account, Airdrop mechanism.
