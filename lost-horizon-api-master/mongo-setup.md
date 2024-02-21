# Mongo Setup on AWS

#### FOR UPDATED ENV SEE BOTTOM SECTION

This document discusses the process of getting MongoDB setup with AWS.

## 1. Create a mongo instance

To do this, go to AWS and create a AWS DocumentDB. Be sure to encrypt it

	Note: Select a VPC that you'd like to use for the application. Likely you'll
	use the default VPC. The important part is to use the SAME VPC that was used
	for your Elastic Beanstalk application. If you haven't set up your EBS app, do
	so first because going through this guide.

In EBS you'll have 2 security groups for your EBS environment.

	1. VPC Security Group
	2. Load Balancer Security Group

You want to make sure you add your AWS DocumentDB TO THE VPC Security Group

As an additional step, you'll need to open port 27017 in AWS to allow connects
from the outside to connect to mongo.

To do this, go to the respective security group > edit inbound rules > and add
in inbound rule from the security group.

	Note: There will be an inbound port 80 security group inbound connection from
	the load balancer (don't make it using the load balancer security group!)

## 2. Download Mongo Compass

	Note: Version 1.32.1 of Mongo DB has issues with SSL/TLS.

Suggested you download version 1.31.0
https://github.com/mongodb-js/compass/releases/tag/v1.31.0

In order to connect to our database there are quite a few steps, first start
by downloading the Mongo Compass client

## Step 3. Setup a SSH Key

In order to connect to Mongo using AWS, there's some magic that must happen. 
This is difficult because you need to connect to the EBS EC2 instance and ssh
tunnel through it in order to connect to your mongo instance.

To setup a key, go to EC2 > Keypairs > Create Key Pair
Options: .pem file, rsa

	1. Download the .pem file and place it in your local directory
	2. Copy it to your ssh directory $ cp lost-horizon-mongo.pem ~/.ssh/

	Note: if you get a permissions error here, just modify the permissions
	$ chmod 400 ~/.ssh/lost-horizon-mongo.pem

## Step 4. Use the Elastic Beanstalk CLI application to setup SSH with your EBS environment

```$ eb init --region us-gov-west-1```

	1. Select your EBS environment.
	2. Select the keypair you just created
	3. update your environment

## Step 5. Verify you can connect via SSH

```$ eb ssh```

Once you connect, the IP address listed is your public IP i.e. 15.205.150.168

WOOT! :sunglasses:


## Step 6. Create SSH Tunnel

```$ ssh -i "lost-horizon-mongo.pem" -L 27017:lost-horizon-db.crlcgfdrihfs.us-gov-west-1.docdb.amazonaws.com:27017 ec2-user@15.205.150.168 -N```

	Note: IF IT HANGS ITS OK - We want to do this in another terminal to keep it open

## Step 7. Download the Gov Cloud PEM

Depending on what region you're in, you need a cert to verify TLS to GovCloud.
This is simple, just download the file and use it when you connect

```$ wget https://truststore.pki.us-gov-west-1.rds.amazonaws.com/us-gov-west-1/us-gov-west-1-bundle.pem```

## Step 8. Connect to Mongo!

For this, I like to use the command line interface because the client tends to
be broken when it comes to TLS. Just download the latest mongo CLI, cd to the directory, and run

```$ mongo --tlsAllowInvalidHostnames --tls --tlsCAFile us-gov-west-1-bundle.pem --username <USERNAME> --password <PASSWORD>```

	Note: If you get an error like this: SSL peer certificate validation failed; connection rejected","attr":{"error":"Certificate trust failure: CSSMERR_TP_NOT_TRUSTED}
	Then you know your security groups are correct!

If it hangs, likely your groups are setup incorrectly in AWS

## Step 9. Connect to Mongo Compass

	Note: When you load Mongo compass, remember to ensure your SSH tunnel is active

There's a weird connection issue with this where you can't use TLS if you have
version 1.30.0 or 1.31 or 1.32 of Mongo Compass. I used 1.29.6 and connected
with Username + password without TLS (unsecure session)

Otherwise just use the CLI :smile:

# Connecting to Mongoose

In Node, connecting to the production AWS Mongo instance is not trivial.

The only way to do this from a development machine (outside of AWS) is to
create a SSH tunnel and connect.

## Experiments

### Experiment 1: Creating SSH Tunnel in Node (Failed)

For an initial experiment, we tested creating a SSH tunnel programatically.

Unfortunately, we had little success doing this. Here's the sample code

```javascript

var tunnel = require('tunnel-ssh');

var tunnelConfig = {
	username: 'ec2-user',
	host: process.env.DB_IP_ADDR,
	privateKey:tunnelCA,
	port:22,
	dstPort:27017,
	dstHost: "lost-horizon-db.crlcgfdrihfs.us-gov-west-1.docdb.amazonaws.com",
};


var aws_server = tunnel(tunnelConfig, function (error, server) {
    if(error){
         console.log("SSH connection error: " + error);
    }
	console.log("Connecting to mongo")
	mongoose.connect(DB, mongoConfig);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'DB connection error:'));
    db.once('open', function() {
        // we're connected!
        console.log("DB connection successful");
    });
});
```

Issue with this.. the tunnel does get created but mongoose will not resolve

### Experiment 2: Creating SSH tunnel manually (Works!)


## Updated Config

Note: Password is the same as before and is also the same one used for the deployed mongo instance (for now). NODE_ENV has meaning now. If production is
set, server will connect to AWS instance

Reminder - SSH tunnel must be set for testing the deployed version locally

See Makefile
```$ make create-mongo-tunnel```

ENV file (config.env)


```bash
NODE_ENV=production
PORT=4000
DB_ADM_USER=dbAdmin
DB_ADM_PASS=<INSERT_PASSWORD_HERE (SAME PASS USED FOR AWS)>
DB_CONNECTION=mongodb+srv://dbAdmin:<PASSWORD>@lost-horizon.eebtg.mongodb.net/lost-horizon?retryWrites=true&w=majority
DB_CONNECTION_AWS=mongodb://dbAdmin:<PASSWORD>@localhost:27017/lost-horizon
DB_IP_ADDR=15.205.150.168

JWT_SECRET=<INSERT_JTW_TOKEN_HERE>

REPO_ONE_ACCOUNT_ID=collen.roller.1@us.af.mil
REPO_ONE_ACCESS_KEY=qC8JcmB29
```

## Contact

Questions: POC - Collen Roller (collen.roller.1@us.af.mil)
