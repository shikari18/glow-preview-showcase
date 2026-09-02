/**
 * Google Identity Services (GSI) — One-Tap / popup OAuth helper.
 *
 * Uses the credential response (JWT) returned by Google.
 * We decode it client-side to extract name/email for the onboarding profile.
 * No backend token exchange is required for this demo-style integration.
 */

export const GOOGLE_CLIENT_ID =
  "950254694464-31ape2pshk4hju879v6snk4fq5qn67ue.apps.googleusercontent.com";

/** Minimal JWT payload fields returned by Google. */
export interface GoogleCredentialPayload {
  sub: string;       // unique Google user ID
  email: string;
  name: string;
  picture: string;
  given_name?: string;
  family_name?: string;
}

/** Decode the JWT payload without verifying the signature (client-side only). */
export function decodeGoogleJwt(credential: string): GoogleCredentialPayload {
  const parts = credential.split(".");
  if (parts.length < 2 || !parts[1]) {
    throw new Error("Invalid Google credential token");
  }
  const json = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
  return JSON.parse(json) as GoogleCredentialPayload;
}

/** Prompt the Google popup sign-in flow and resolve with the credential JWT on success. */
export function triggerGoogleSignIn(): Promise<string> {
  return new Promise((resolve, reject) => {
    const gsi = (window as Window & { google?: { accounts: { id: { initialize: (cfg: object) => void; prompt: (notification?: (n: {isNotDisplayed(): boolean; isSkippedMoment(): boolean}) => void) => void; renderButton: (el: HTMLElement, cfg: object) => void } } } }).google;

    if (!gsi) {
      reject(new Error("Google Identity Services not loaded yet."));
      return;
    }

    gsi.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response: { credential?: string; error?: string }) => {
        if (response.credential) {
          resolve(response.credential);
        } else {
          reject(new Error(response.error ?? "Google sign-in cancelled."));
        }
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    // Trigger the One Tap / popup
    gsi.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // One Tap was suppressed — fall back to the popup button flow
        const container = document.createElement("div");
        container.style.cssText = "position:fixed;top:-9999px;left:-9999px";
        document.body.appendChild(container);
        gsi.accounts.id.renderButton(container, {
          type: "standard",
          theme: "outline",
          size: "large",
        });
        const btn = container.querySelector<HTMLElement>("div[role=button]");
        if (btn) {
          btn.click();
        } else {
          document.body.removeChild(container);
          reject(new Error("Could not trigger Google sign-in popup."));
        }
      }
    });
  });
}
