import Changelog from "../../ChangelogLib"

const changelogMessage = [
    "&bRead the changelogs in #announcements",
]

const changelog = new Changelog("PitSandboxDEV", "2.0.0", changelogMessage.join('\n'))
changelog.writeChangelog({ name: "&d&l&n", version: "&e", changelog: "&a" })