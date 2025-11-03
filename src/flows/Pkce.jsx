// deno-lint-ignore-file no-unused-vars
// solid
import { createMemo, createSignal, Match, onMount, Switch } from "solid-js";
import { createStore } from "solid-js/store";

// icons
import IDPShieldIcon from "@assets/idpshield.svg?component-solid";
import RSDataIcon from "@assets/rsdata.svg?component-solid";
import ClientSrvIcon from "@assets/clientsrv.svg?component-solid";
// import ResourcesIcon from "@assets/resources.svg?component-solid";
// import RegUsersIcon from "@assets/users.svg?component-solid";

// actors
import Actor from "@actors/Actor";
import Action from "@actors/Action";
import Browser from "@actors/Browser";
import Attribute from "@actors/Attribute";
import User from "@actors/User";
import Permissions from "@actors/Permissions";
import Login from "@actors/Login";
import Payload from "@actors/Payload";
import Function from "@actors/Function";
import Mouse from "@actors/Mouse";

//utils
import {
    generateHighlightedHeaders,
    generateHighlightedJSON,
    generateHighlightedURLParams,
} from "@utils/highlighters";
import {
    addAccessToken,
    addClientId,
    addCode,
    addCodeChallenge,
    addCodeChallengeMethod,
    addCodeVerifier,
    addExpiresIn,
    addRedirectUri,
    addRefreshToken,
    addState,
    addTokenTypeAndScope,
} from "@utils/payloadAdders";

/**
 * @returns {JSX.Element}
 */
const Pkce = () => {
    const [stepState, setStepState] = createSignal(0);

    const [showElement, setShowElement] = createSignal(false);

    const [authRequest, setAuthRequest] = createStore({
        "response_type": "code",
    });

    const [authCodeExchangeRequest, setAuthCodeExchangeRequest] = createStore({
        "grant_type": "authorization_code",
    });

    const [accessResponse, setAccessResponse] = createStore({});

    const [codeResponse, setCodeResponse] = createStore({});

    const authRequestHtml = createMemo(() =>
        generateHighlightedURLParams(authRequest)
    );
    const authCodeExchangeRequestHtml = createMemo(() =>
        generateHighlightedURLParams(authCodeExchangeRequest)
    );

    const accessResponseHtml = createMemo(() =>
        generateHighlightedJSON(accessResponse)
    );

    const codeResponseHtml = createMemo(() =>
        generateHighlightedJSON(codeResponse)
    );

    const apiRequest = {
        "Authorization": "Bearer eyJhbGciOiOiJ...",
        "Accept": "application/json",
        "Content-Type": "application/json",
    };

    const apiRequestHtml = generateHighlightedHeaders(apiRequest);

    const fakeData = {
        "eventId": 1234567890,
        "eventType": "transaction",
        "amount": 100.00,
        "currency": "USD",
        "timestamp": "2023-10-01T12:00:00Z",
    };

    const fakeDataHtml = generateHighlightedJSON(fakeData);

    const animationFlow = [
        {
            description: "Initial State",
            run: [],
        },
        {
            description: "User initiates login on Client Application",
            run: [
                {
                    fn: setShowElement,
                    args: [true],
                    delay: 500,
                },
                {
                    fn: setShowElement,
                    args: [false],
                    delay: 1500,
                },
            ],
        },
        {
            description: "Client Application creates Code Verifier",
            run: [],
        },
        {
            description:
                "Client Application creates Code Challenge from Code Verifier",
            run: [],
        },
        {
            description: "Client Application generates a random State value",
            run: [],
        },
        {
            description: "Client Application creates Authorization Request",
            run: [
                {
                    fn: addClientId,
                    args: [setAuthRequest],
                    delay: 1000,
                },
                {
                    fn: addRedirectUri,
                    args: [setAuthRequest],
                    delay: 2000,
                },
                {
                    fn: addState,
                    args: [setAuthRequest],
                    delay: 3000,
                },
                {
                    fn: addCodeChallenge,
                    args: [setAuthRequest],
                    delay: 4000,
                },
                {
                    fn: addCodeChallengeMethod,
                    args: [setAuthRequest],
                    delay: 5000,
                },
            ],
        },
        {
            description: "User authorizes request at IDP",
            run: [
                {
                    fn: setShowElement,
                    args: [true],
                    delay: 500,
                },
                {
                    fn: setShowElement,
                    args: [false],
                    delay: 1500,
                },
            ],
        },
        {
            description:
                "IDP generates Authorization Code and stores code challenge",
            run: [],
        },
        {
            description:
                "IDP creates Authorization Response with Authorization Code",
            run: [
                {
                    fn: addCode,
                    args: [setCodeResponse],
                    delay: 1000,
                },
                {
                    fn: addState,
                    args: [setCodeResponse],
                    delay: 2000,
                },
            ],
        },
        {
            description:
                "Client Application sends Authorization Code and Code Verifier to IDP to exchange for tokens",
            run: [
                {
                    fn: addCode,
                    args: [setAuthCodeExchangeRequest],
                    delay: 1000,
                },
                {
                    fn: addRedirectUri,
                    args: [setAuthCodeExchangeRequest],
                    delay: 2000,
                },
                {
                    fn: addClientId,
                    args: [setAuthCodeExchangeRequest],
                    delay: 3000,
                },
                {
                    fn: addCodeVerifier,
                    args: [setAuthCodeExchangeRequest],
                    delay: 4000,
                },
            ],
        },
        {
            description:
                "IDP validates Code Verifier against stored Code Challenge",
            run: [],
        },
        {
            description: "IDP issues tokens to Client Application",
            run: [
                {
                    fn: addAccessToken,
                    args: [setAccessResponse],
                    delay: 1000,
                },
                {
                    fn: addRefreshToken,
                    args: [setAccessResponse],
                    delay: 2000,
                },
                {
                    fn: addExpiresIn,
                    args: [setAccessResponse],
                    delay: 3000,
                },
                {
                    fn: addTokenTypeAndScope,
                    args: [setAccessResponse],
                    delay: 4000,
                },
            ],
        },
        {
            description:
                "Client Application uses Access Token to call Resource Server API",
            run: [],
        },
        {
            description: "Resource Server validates Access Token",
            run: [],
        },
        {
            description:
                "Resource Server returns protected resources to Client Application",
            run: [],
        },
    ];

    const timeouts = [];

    const forward = () => {
        timeouts.forEach((tmId) => clearTimeout(tmId));
        timeouts.length = 0;

        const currentStep = stepState();
        if (currentStep < animationFlow.length) {
            const step = animationFlow[currentStep + 1];
            step.run.forEach((action) => {
                const tmId = setTimeout(() => {
                    console.log(`Executing action: ${action.fn.name}`);
                    action.fn(...action.args);
                }, action.delay);

                timeouts.push(tmId);
            });
            setStepState(currentStep + 1);
        }
    };

    const backward = () => {
        timeouts.forEach((tmId) => clearTimeout(tmId));
        timeouts.length = 0;

        const currentStep = stepState();
        if (currentStep > 0) {
            const step = animationFlow[currentStep - 1];
            step.run.forEach((action) => {
                const tmId = setTimeout(() => {
                    console.log(`Executing action: ${action.fn.name}`);
                    action.fn(...action.args);
                }, action.delay);

                timeouts.push(tmId);
            });
            setStepState(currentStep - 1);
        }
    };

    onMount(() => {
        forward();
    });

    return (
        <div class="flex flex-col items-center">
            <div class="flex w-full h-150 justify-center items-center mb-8">
                <Switch>
                    <Match when={stepState() === 1}>
                        <User />
                        <Action text={"Interacts with"} />
                        <Browser>
                            <Login />
                            <Show when={showElement()}>
                                <Mouse psX={475} psY={415} />
                            </Show>
                        </Browser>
                    </Match>
                    <Match when={stepState() >= 2 && stepState() < 5}>
                        <Actor
                            title="Client Application"
                            svg={<ClientSrvIcon />}
                        >
                            <Switch>
                                <Match when={stepState() === 2}>
                                    <Function output="Code Verifier" />
                                </Match>
                                <Match when={stepState() === 3}>
                                    <Function
                                        input="Code Verifier"
                                        output="Code Challenge"
                                    />
                                </Match>
                                <Match when={stepState() === 4}>
                                    <Function output="State" />
                                </Match>
                            </Switch>
                        </Actor>
                    </Match>
                    <Match when={stepState() === 5}>
                        <Actor
                            title="Client Application"
                            svg={<ClientSrvIcon />}
                        />
                        <Action text={"Navigates to"} />
                        <Actor title="Request" payload>
                            <Payload text={authRequestHtml()} />
                        </Actor>
                    </Match>
                    <Match when={stepState() === 6}>
                        <Actor title="IDP" svg={<IDPShieldIcon />} />
                        <Action text={"Redirects browser for Authorization"} />
                        <Browser>
                            <Permissions />
                            <Show when={showElement()}>
                                <Mouse psX={475} psY={490} />
                            </Show>
                        </Browser>
                        <Action text={"authorizes"} reversed />
                        <User />
                    </Match>
                    <Match when={stepState() === 7}>
                        <Actor title="IDP" svg={<IDPShieldIcon />}>
                            <Function output="Authorization Code" />
                        </Actor>
                    </Match>
                    <Match when={stepState() === 8}>
                        <Actor title="IDP" svg={<IDPShieldIcon />} />
                        <Action text={"Sends"} />
                        <Actor title="Code Response" payload>
                            <Payload text={codeResponseHtml()} />
                        </Actor>
                    </Match>
                    <Match when={stepState() === 9}>
                        <Actor
                            title="Client Application"
                            svg={<ClientSrvIcon />}
                        />
                        <Action text={"Sends"} />
                        <Actor title="Code Exchange" payload>
                            <Payload text={authCodeExchangeRequestHtml()} />
                        </Actor>
                    </Match>
                    <Match when={stepState() === 10}>
                        <Actor title="IDP" svg={<IDPShieldIcon />}>
                            <Function input="Authorization Code & Code Verifier" />
                        </Actor>
                    </Match>
                    <Match when={stepState() === 11}>
                        <Actor title="IDP" svg={<IDPShieldIcon />} />
                        <Action text={"Sends"} />
                        <Actor title="Token Response" payload>
                            <Payload text={accessResponseHtml()} />
                        </Actor>
                    </Match>
                    <Match when={stepState() === 12}>
                        <Actor
                            title="Client Application"
                            svg={<ClientSrvIcon />}
                        />
                        <Action text={"Sends"} />
                        <Actor title="Request Headers" payload>
                            <Payload text={apiRequestHtml} />
                        </Actor>
                    </Match>
                    <Match when={stepState() === 13}>
                        <Actor title="Resource Server" svg={<RSDataIcon />}>
                            <Function input="Access Token" />
                        </Actor>
                    </Match>
                    <Match when={stepState() === 14}>
                        <Actor title="Resource Server" svg={<RSDataIcon />} />
                        <Action text={"Sends"} />
                        <Actor title="Protected Resource" payload>
                            <Payload text={fakeDataHtml} />
                        </Actor>
                    </Match>
                </Switch>
            </div>
            <div>
                <p class="mb-4 text-center font-semibold">
                    {animationFlow[stepState()].description}
                </p>
            </div>
            <div class="flex gap-4">
                <div class="flex gap-4">
                    <Show when={stepState() > 1}>
                        <button
                            class="bg-blue-500 w-36 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                            onClick={() => backward()}
                        >
                            Back
                        </button>
                    </Show>
                    <Show when={stepState() < animationFlow.length - 1}>
                        <button
                            class="bg-blue-500 w-36 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                            onClick={() => forward()}
                        >
                            Next
                        </button>
                    </Show>
                </div>
            </div>
        </div>
    );
};

export default Pkce;
