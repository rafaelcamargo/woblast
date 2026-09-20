/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

declare module '*.styl';

declare module '*.webp' {
  const src: string;
  export default src;
}
