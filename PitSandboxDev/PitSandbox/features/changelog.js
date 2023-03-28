import Changelog from "../../ChangelogLib"

const changelogMessage = [
    "&bRead the changelogs in #announcements",
]

const changelog = new Changelog("PitSandbox", "2.1.2", changelogMessage.join('\n'))
changelog.writeChangelog({ name: "&d&l&n", version: "&e", changelog: "&a" })