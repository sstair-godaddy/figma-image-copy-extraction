# 🎫 VNEXT Team Jira Ticket Templates

## Quick Reference
**Project**: VNEXT (Presence Team)  
**Component**: Dragons 
**Template Version**: 2.0 (Based on Team Templates)  
**Last Updated**: 2025-06-26

---

## 🚨 Ticket Creation Rules & Best Practices

### Essential Rules
1. **Unused Sections**: If a section isn't needed, put "N/A" and remove bullet points
2. **Be Concise**: Make tickets concise - avoid verbosity, get to the point
3. **Clickable URLs**: All URLs must be formatted as clickable markdown links
4. **Default Sprint**: Add new tickets to "Dragons in refinement" sprint
5. **Clarifying Questions**: Ask clarifying questions for vague requirements before creating
6. **Preview & Approval**: Show ticket preview and get approval before creating in Jira

### Quality Checklist
- [ ] All sections are either filled with relevant content or marked "N/A"
- [ ] Description is concise and clear
- [ ] URLs are properly formatted as `[Link Text](URL)`
- [ ] Requirements are well-defined (no vague statements)
- [ ] Ticket preview reviewed and approved
- [ ] Ready to add to "Dragons in refinement" sprint

---

## 📋 Template Types

### Available Templates
- **VNEXT-47598**: [Story Template](#story-template) - General user stories
- **VNEXT-47610**: [Bug Template](#bug-template) - Bug reports and fixes  
- **VNEXT-47589**: [Spike Template](#spike-template) - Research and investigation tasks

---

## 📖 Story Template
*Based on VNEXT-47598: TEMPLATE: Story*

### Title Format
`[AREA]: [Brief Description]`

**Area Prefixes**:
- `VH:` - Venture Home
- `UPP:` - Unified Plans and Pricing  
- `CG:` - Capabilities Graph
- `UEG:` - USI eComm Graph
- `MB:` - Monetization Banner
- `Editor:` - Editor
- `Cleanup:` - Technical debt/cleanup
- `TEMPLATE:` - Template tickets

### Description Template
```
**Description:** Brief explanation of changes (UI, logic, functionality).

**AC:** Dev bullet points of what to complete

* Happy and Sad path testing
* Specify testing that should be covered.
* eids needed (impressions and click events)
* create Kibana / ESSP board

**POC:** (point of contact) Teams, code owners, devs, slack channels how can act as resources as needed.

**Dependencies:** 
* [Specific dependencies or "N/A"]
* API Swagger
* Repos
* AppConfig 
* Hivemind
* Blocking tickets

**Documentation:** 
* [Required docs or "N/A"]
* Update Readme as needed
* Any relevant documentation
* code snippets
* Design Docs 
* Slack threads, etc

**UI Design:** 
* [Design assets/requirements or "N/A"]
* Assets 
* Copy changes. 
* Figma links
* Finalized UX?

**Review**
* UX sign off (if needed)
* 2 peer reviews (#monetization-prs)
* QA (#usi-ii-quality-support)
* Is an ET needed? 

**Done:** 
* When the ticket is considered complete. 
* Wait for translations? 
* PR merged
* Any version bumps needed for consuming apps?
* ESSP / Kibana Board (checking for uptick in failures)
```

### Issue Details
- **Issue Type**: Story
- **Priority**: P3 - Low (default, adjust as needed)
- **Component**: Dragons
- **Labels**: Dragons
- **Sprint**: Dragons in refinement

---

## 🐛 Bug Template
*Based on VNEXT-47610: TEMPLATE: Bug Story*

### Title Format
`[AREA]: [Bug Description]`

### Description Template
```
**Description:** Issue and customer impact.

**AC:** 
* Fix the identified issue
* [Testing requirements or "N/A"]

**Documentation:** 
* Update relevant documentation
* Check Kibana/ESSP dashboards for related errors
* Document any configuration changes needed

**Repro Steps:**
1. Go to [environment/URL]
2. [Action step 1]
3. [Action step 2]
4. [Result]

**Environment:** 
- Browser: [Browser or "N/A"]
- OS: [OS or "N/A"]
- ShopperId: [ID or "N/A"]

**Expected Results:** [What should happen]

**Actual Results:** [What actually happens]

**Priority Guidelines:**
- P1: Critical production/revenue impact
- P2: High user experience impact  
- P3: Medium impact with workaround
- P4: Low impact/cosmetic

**Additional Context:** [Context or "N/A"]
```

### Issue Details
- **Issue Type**: Bug
- **Priority**: Based on Bug Standardization Guidelines
- **Component**: Dragons
- **Labels**: Dragons
- **Sprint**: Dragons in refinement

---

## 🔍 Spike Template
*Based on VNEXT-47589: TEMPLATE: Spike Story*

### Title Format
`[AREA]: [Research Topic/Question]`

### Description Template
```
**Description:** Research task to understand/solve [specific problem].

**AC:** What we need to understand or accomplish
* Investigate [specific area/technology/approach]
* Document findings and recommendations
* Identify potential solutions or approaches
* Create follow-up tickets if needed
* [Additional criteria or "N/A"]

**Spike Outputs (choose applicable):**
* Fix bugs or issues discovered
* Create new tickets for implementation
* Build proof of concept/prototype
* Update documentation with findings
* Recommend approach for implementation

**Known Information:**
* [What we already know about the problem]
* [Current state/baseline]
* [Constraints or requirements]
* [Current knowledge or "N/A"]

**Unknown Information:**
* [What we need to research/discover]
* [Questions to answer]
* [Assumptions to validate]
* [What needs research]

**Time Box:** [1-2 days recommended]

**Success Criteria:**
* Clear understanding of the problem/solution
* Documented findings and recommendations
* Next steps identified and tickets created
```

### Issue Details
- **Issue Type**: Task
- **Priority**: P3 - Low (default, adjust as needed)
- **Component**: Dragons
- **Labels**: Dragons
- **Sprint**: Dragons in refinement

---

## 🏷️ Standard Issue Details

### Priority Levels
- **P1 - Critical**: Blocking/urgent, production issues
- **P2 - High**: Important, needs attention soon
- **P3 - Low**: Normal priority (team default)
- **P4 - Low**: Nice to have, low impact

### Issue Types
- **Story**: New feature or enhancement
- **Epic**: Large feature needing breakdown
- **Bug**: Problem/defect to fix
- **Task**: General work item (spikes, research)
- **Sub-task**: Part of larger story/epic

### Standard Fields
- **Component**: Dragons (for freemat 2.0 and paywall related tickets)
- **Labels**: Dragons
- **Project**: VNEXT
- **Team**: Presence
- **Sprint**: Dragons in refinement (default)

---

## 🔧 Common Patterns & Best Practices

### Acceptance Criteria Guidelines
- Use bullet points for clear, testable criteria
- Include both happy path and sad path testing
- Specify EIDs needed for tracking (impressions, clicks)
- Mention Kibana/ESSP board creation for monitoring
- **Mark unused criteria as "N/A"**

### Dependencies Section
- API Swagger documentation
- Repository dependencies
- AppConfig changes
- Hivemind experiments
- Blocking tickets
- **Use "N/A" if no dependencies**

### Review Process
- UX sign-off (when needed)
- 2 peer reviews (#monetization-prs channel)
- QA review (#usi-ii-quality-support channel)
- ET (Experiment Tracking) considerations
- **Mark as "N/A" if not needed**

### Definition of Done
- PR merged
- Version bumps for consuming apps (if needed)
- ESSP/Kibana board monitoring active
- Translations completed (if applicable)

---

## 📞 Team Contacts & Resources

### Slack Channels
- **#monetization-prs**: Code reviews
- **#usi-ii-quality-support**: QA support
- **Team channels**: For POC and resources

### Documentation
- Update README files as needed
- Include relevant code snippets
- Link to design docs and Figma
- Reference Slack threads for context

---

## 🚀 Ticket Creation Workflow

### Before Creating Ticket
1. **Ask Clarifying Questions** for vague requirements:
   - What specific functionality needs to change?
   - Who are the stakeholders?
   - What's the expected timeline?
   - Are there any constraints or dependencies?
   - What does success look like?

2. **Prepare Ticket Preview**:
   - [ ] Choose appropriate template (Story/Bug/Spike)
   - [ ] Use correct area prefix in title
   - [ ] Fill description following template (use "N/A" for unused sections)
   - [ ] Make content concise and clear
   - [ ] Format all URLs as clickable links `[Text](URL)`
   - [ ] Set Component to "Dragons"
   - [ ] Add "Dragons" label
   - [ ] Set appropriate priority

3. **Get Approval**:
   - [ ] Show complete ticket preview
   - [ ] Get stakeholder approval
   - [ ] Confirm all requirements are clear

### After Creating Ticket
- [ ] Add to "Dragons in refinement" sprint
- [ ] Link to Epic/Parent if applicable
- [ ] Assign to team member if known
- [ ] Notify relevant stakeholders
- [ ] Update related documentation

---

*💡 **Note**: These templates are based on actual VNEXT team templates (VNEXT-47598, VNEXT-47610, VNEXT-47589). Follow the creation rules strictly for consistency and quality.* 