// deno-lint-ignore-file no-unused-vars
// solid
import { createMemo, createSignal, Match, onMount, Switch } from "solid-js";
import { createStore } from "solid-js/store";

// icons
import IDPShieldIcon from "@assets/idpshield.svg?component-solid";
import RSDataIcon from "@assets/rsdata.svg?component-solid";
import ClientSrvIcon from "@assets/clientsrv.svg?component-solid";
import UserIcon from "@assets/user.svg?component-solid";

// actors
import Actor from "@actors/Actor";
import Action from "@actors/Action";
import Browser from "@actors/Browser";
import LightActor from "@actors/LightActor";
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
        "amount": 100.0,
        "currency": "USD",
        "timestamp": "2023-10-01T12:00:00Z",
    };

    const fakeDataHtml = generateHighlightedJSON(fakeData);

    const animationFlow = [
        {
            description:
                "Initial state — no actions have been taken yet. The client, browser, and IDP are idle; no codes, verifiers, or tokens exist.",
            run: [],
        },
        {
            description:
                "User clicks 'Login' in the Client Application, starting the authorization flow. The browser prepares to navigate to the IDP for user authentication and consent.",
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
                "Client generates a high-entropy Code Verifier (a random secret string) locally. This verifier is kept private in the client and will be used later to prove the requester's origin.",
            run: [],
        },
        {
            description:
                "Client derives a Code Challenge from the Code Verifier (for example, SHA-256 + base64-url). The challenge is safe to send to the IDP and binds the eventual token exchange to this client.",
            run: [],
        },
        {
            description:
                "Client generates a random State parameter to correlate request and response and to mitigate CSRF. State will be validated when the authorization response returns.",
            run: [],
        },
        {
            description:
                "Client constructs the Authorization Request (response_type=code, client_id, redirect_uri, state, code_challenge, code_challenge_method) and navigates the user's browser to the IDP's authorization endpoint.",
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
            description:
                "User authenticates at the IDP and is presented with a consent/permission prompt. When the user approves, the IDP proceeds to issue an authorization code.",
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
                "IDP generates an Authorization Code and securely stores the associated Code Challenge and request metadata for later verification.",
            run: [],
        },
        {
            description:
                "IDP redirects the user's browser back to the Client's redirect URI with the Authorization Code and the State parameter in the query string.",
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
                "Client receives the Authorization Code and constructs a token request to the IDP token endpoint, including the Authorization Code and the original Code Verifier.",
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
                "IDP validates that the provided Code Verifier matches the previously stored Code Challenge (e.g., by recomputing challenge). If validation succeeds, the exchange is authorized.",
            run: [],
        },
        {
            description:
                "On successful verification, the IDP issues tokens (access_token, refresh_token, expires_in, token_type, scope) in the token response and returns them to the Client.",
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
                "Client includes the Access Token in the Authorization header (Bearer) when calling the Resource Server API to access protected resources.",
            run: [],
        },
        {
            description:
                "Resource Server validates the Access Token (signature/introspection/claims, expiry, scopes). If valid, it allows access to the requested resource.",
            run: [],
        },
        {
            description:
                "Resource Server responds with the requested protected resource (e.g., user data, transaction details) to the Client application.",
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
                        <LightActor title="User" svg={<UserIcon />} />
                        <Action text={"Interacts with"} direction={0} />
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
                        <LightActor
                            title="Client Application"
                            svg={<ClientSrvIcon />}
                        />
                        <Action text={"Navigates to"} direction={0} />
                        <Actor title="Request" payload>
                            <Payload text={authRequestHtml()} />
                        </Actor>
                    </Match>
                    <Match when={stepState() === 6}>
                        <LightActor title="IDP" svg={<IDPShieldIcon />} />
                        <Action
                            text={"Redirects browser for Authorization"}
                            direction={0}
                        />
                        <Browser>
                            <Permissions />
                            <Show when={showElement()}>
                                <Mouse psX={475} psY={490} />
                            </Show>
                        </Browser>
                        <Action text={"authorizes"} direction={1} />
                        <LightActor title="User" svg={<UserIcon />} />
                    </Match>
                    <Match when={stepState() === 7}>
                        <Actor title="IDP" svg={<IDPShieldIcon />}>
                            <Function output="Authorization Code" />
                        </Actor>
                    </Match>
                    <Match when={stepState() === 8}>
                        <LightActor title="IDP" svg={<IDPShieldIcon />} />
                        <Action text={"Sends"} direction={0} />
                        <Actor title="Code Response" payload>
                            <Payload text={codeResponseHtml()} />
                        </Actor>
                    </Match>
                    <Match when={stepState() === 9}>
                        <LightActor
                            title="Client Application"
                            svg={<ClientSrvIcon />}
                        />
                        <Action text={"Sends"} direction={0} />
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
                        <LightActor title="IDP" svg={<IDPShieldIcon />} />
                        <Action text={"Sends"} direction={0} />
                        <Actor title="Token Response" payload>
                            <Payload text={accessResponseHtml()} />
                        </Actor>
                    </Match>
                    <Match when={stepState() === 12}>
                        <LightActor
                            title="Client Application"
                            svg={<ClientSrvIcon />}
                        />
                        <Action text={"Sends"} direction={0} />
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
                        <LightActor
                            title="Resource Server"
                            svg={<RSDataIcon />}
                        />
                        <Action text={"Sends"} direction={0} />
                        <Actor title="Protected Resource" payload>
                            <Payload text={fakeDataHtml} />
                        </Actor>
                    </Match>
                </Switch>
            </div>
            <div>
                <div class="mb-8 border rounded-md shadow-md p-4 w-200 text-center font-semibold">
                    {animationFlow[stepState()].description}
                </div>
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
