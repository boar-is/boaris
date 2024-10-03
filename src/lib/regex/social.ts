export const socialRegexes = {
  github: /^(https:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/?(.*)?$/,
  twitter:
    /^(https:\/\/)?(www\.)?(twitter\.com|x\.com)\/[A-Za-z0-9_.-]+\/?(.*)?$/,
  linkedin:
    /^(https:\/\/)?(www\.)?linkedin\.com\/(in|company|pub)\/[A-Za-z0-9_-]+\/?$/,
  stackoverflow:
    /^(https:\/\/)?(www\.)?stackoverflow\.com\/users\/[0-9]+\/[A-Za-z0-9_-]+\/?$/,
  discord: /^(https:\/\/)?(www\.)?discord\.gg\/[A-Za-z0-9_-]+\/?$/,
  youtube:
    /^(https:\/\/)?(www\.)?youtube\.com\/(user|channel|watch|c|embed)\/?[A-Za-z0-9_.-]*\/?(.*)?(\?v=[A-Za-z0-9_-]+)?$|^(https:\/\/)?(www\.)?youtu\.be\/[A-Za-z0-9_-]+\/?$/,
  reddit: /^(https:\/\/)?(www\.)?reddit\.com\/(user|r)\/[A-Za-z0-9_-]+\/?$/,
  telegram: /^(https:\/\/)?(www\.)?t\.me\/[A-Za-z0-9_-]+\/?$/,
} as const
