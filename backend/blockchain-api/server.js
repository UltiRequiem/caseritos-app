const express = require("express");
const { connect, KeyPair, keyStores } = require("near-api-js");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

async function main() {
  const keyStore = new keyStores.InMemoryKeyStore();
  const contractId = process.env.CONTRACT_ID;
  const privateKey = process.env.PRIVATE_KEY;

  if (!contractId || !privateKey) {
    console.error(
      "Missing environment variables: CONTRACT_ID and/or PRIVATE_KEY"
    );
    process.exit(1);
  }

  try {
    // Add the key to the keystore
    await keyStore.setKey(
      "testnet",
      contractId, // The account ID must match the one you're adding the key for
      KeyPair.fromString(privateKey)
    );

    const near = await connect({
      networkId: "testnet",
      keyStore,
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    });

    console.log(`Connected to NEAR testnet. Contract ID: ${contractId}`);

    const account = await near.account(contractId);

    try {
      await account.state();
      console.log(`Successfully connected to account ${contractId}`);
    } catch (error) {
      console.error(`Error accessing account ${contractId}:`, error.message);
      process.exit(1);
    }

    app.post("/add-record", async (req, res) => {
      const { did1, hash, did2 } = req.body;

      if (!did1 || !hash || !did2) {
        return res.status(400).json({
          error:
            "Missing required parameters: did1, hash, and did2 are required",
        });
      }

      try {
        const outcome = await account.functionCall({
          contractId,
          methodName: "add_record",
          args: { did1, hash, did2 },
          gas: "300000000000000",
        });

        res.status(200).json({ success: true, outcome });
      } catch (error) {
        console.error("Error calling contract:", error);
        res.status(500).json({ error: error.message });
      }
    });

    app.listen(3001, () => console.log("API running on port 3001"));
  } catch (error) {
    console.error("Error during initialization:", error);
    process.exit(1);
  }
}

main();
