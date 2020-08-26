const express = require('express');
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Swagger API Documentation
const port = process.env.PORT;
const ip = process.env.IP;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.3",
        info: {
            title: "VanillaStack API",
            description: "This is a sample API for the communication between Front- and Backend for the VanillaStack",
            termsOfService: "https://cloudcial.io/terms/",
            contact: {
                email: "apiteam@cloudical.io"
            },
            license: {
                name: "Apache 2.0",
                url: "https://www.apache.org/licenses/LICENSE-2.0.html"
            },
            version: "1.0.0"
        },
        servers: [{
            url: `http://${ip}:{port}/{basePath}`,
            variables: {
                port: {
                    default: port
                },
                basePath: {
                    default: "api/v1/"
                }
            }
        }],

        components: {
            schemas: {
                loadbalancer_virtualip: {},
                loadbalancer_fqdn: {},
                reset: {},
                service_cidr: {},
                podnet_cidr: {},
                Node: {
                    required: [
                        "hostname",
                        "username",
                        "ssh_key"
                    ],
                    type: "object",
                    properties: {
                        name: {
                            type: "string"
                        },
                        hostname: {
                            type: "string",
                            example: "domain.io"
                        },
                        username: {
                            type: "string",
                            example: "root"
                        },
                        ssh_key: {
                            type: "string"
                        }
                    }
                },
                Nodes: {
                    type: "array",
                    items: {
                        required: [
                            "node",
                            "role"
                        ],
                        properties: {
                            node: {
                                $ref: "#/components/schemas/Node"
                            },
                            role: {
                                type: "string",
                                example: "m"
                            }
                        }
                    }
                },
                InternalLB: {
                    type: "object",
                    required: [
                        "enabled"
                    ],
                    properties: {
                        enabled: {
                            type: "boolean"
                        },
                        ip: {
                            type: "string"
                        },
                        fqdn: {
                            type: "string"
                        }
                    }
                },
                ExternalLB: {
                    type: "object",
                    required: [
                        "enabled"
                    ],
                    properties: {
                        enabled: {
                            type: "boolean"
                        },
                        ip_fqdn: {
                            type: "string"
                        },
                        metalLB: {
                            type: "boolean"
                        }
                    }
                },
                Tag: {
                    type: "object",
                    properties: {
                        key: {
                            type: "string"
                        },
                        value: {
                            type: "string"
                        }
                    }
                },
                Tags: {
                    type: "array",
                    items: {
                        $ref: "#/components/schemas/Tag"
                    }
                },
                Cluster: {
                    type: "object",
                    required: [
                        "nodes",
                        "clusterName",
                        "internalLB",
                        "externalLB"
                    ],
                    properties: {
                        nodes: {
                            $ref: "#/components/schemas/Nodes"
                        },
                        clusterName: {
                            type: "string",
                            example: "default"
                        },
                        internalLB: {
                            $ref: "#/components/schemas/InternalLB"
                        },
                        externalLB: {
                            $ref: "#/components/schemas/ExternalLB"
                        },
                        tags: {
                            $ref: "#/components/schemas/Tags"
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js', './src/routes/api/*.js']

}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


/* OpenAPI Docu. */
// router.get('/', function (req, res, next) {
//     res.send('Hello World');
// });

module.exports = router;
