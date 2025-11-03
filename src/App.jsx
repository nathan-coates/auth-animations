import { A } from "@solidjs/router";

const App = () => {
    return (
        <div>
            <p class="text-4xl text-green-700 text-center py-20">
                Auth Animations
            </p>
            <A href="/pkce">PKCE</A>
        </div>
    );
};

export default App;
