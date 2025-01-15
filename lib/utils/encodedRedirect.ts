import { redirect } from 'next/navigation';

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */

export function encodedRedirect(
  type: 'error' | 'success',
  path: string,
  message: string,
  token_hash?: string,
  email?: string
) {
  let redirectUrl = `${path}?${type}=${encodeURIComponent(message)}`;
  if (token_hash)
    redirectUrl += `&token_hash=${encodeURIComponent(token_hash)}`;
  if (email) redirectUrl += `&email=${encodeURIComponent(email)}`;
  console.log('Redirecting to:', redirectUrl); // デバッグ用
  return redirect(redirectUrl);
}
