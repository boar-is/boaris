import { socialUrls } from '~/lib/data'

export function Footer() {
  return (
    <div className="container">
      <ul className="flex justify-between gap-4 py-3 font-medium text-gray-800 text-sm">
        <li>
          <span>boar.is 2024</span>
        </li>
        <li className="ml-auto">
          <a href={socialUrls.x} target="_blank" rel="noreferrer">
            Twitter
          </a>
        </li>
        <li>
          <a href={socialUrls.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={socialUrls.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href="">Privacy</a>
        </li>
      </ul>
    </div>
  )
}
