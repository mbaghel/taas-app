/**
 * Create New Team
 * Landing page for creating new teams
 * by selecting a role, inputting skills,
 * or inputting a job description
 */
import React from "react";
import { navigate } from "@reach/router";
import _ from "lodash";
import { toastr } from "react-redux-toastr";
import Page from "components/Page";
import PageHeader from "components/PageHeader";
import LandingBox from "./components/LandingBox";
import IconMultipleActionsCheck from "../../assets/images/icon-multiple-actions-check-2.svg";
import IconListQuill from "../../assets/images/icon-list-quill.svg";
import IconOfficeFileText from "../../assets/images/icon-office-file-text.svg";

function CreateNewTeam() {
  const goToInputSkills = () => {
    navigate("/taas/myteams/createnewteam/skills");
  };

  const goToSelectRole = () => {
    navigate("/taas/myteams/createnewteam/role");
  };

  const goToJobDescription = () => {
    navigate(`/taas/myteams/createnewteam/jd`);
  };

  return (
    <Page title="Create New Team">
      <PageHeader title="Create New Team" />
      <p>
        Please select how you want to find members that match your requirements.
      </p>
      <LandingBox
        title="Select a Role"
        description="You know you want a front end developer, or a full stack developer, mobile one or others."
        icon={<IconMultipleActionsCheck />}
        backgroundImage="linear-gradient(101.95deg, #8B41B0 0%, #EF476F 100%)"
        onClick={goToSelectRole}
      />
      <LandingBox
        title="Input Skills"
        description="You know your developer has specific skills, such as for example: Java, Python, Oracle, etc."
        icon={<IconListQuill />}
        backgroundImage="linear-gradient(221.5deg, #2C95D7 0%, #9D41C9 100%)"
        onClick={goToInputSkills}
      />
      <LandingBox
        title="Input Job Description"
        description="You would like to use a description to explain what you need."
        icon={<IconOfficeFileText />}
        backgroundImage="linear-gradient(135deg, #2984BD 0%, #0AB88A 100%)"
        onClick={goToJobDescription}
      />
    </Page>
  );
}

export default CreateNewTeam;