import React from 'react';

// TODO: 整理
export type Translate = {
  APP_NAME: string;
  APP_DESCRIPTION: string;

  PRECAUTIONS: string;
  PRECAUTIONS_ITEMS: string[];
  PRIVACY_POLICY: string;

  PLEASE_READ_PRECAUTIONS: React.ReactNode;

  COPIED_TO_CLIPBOARD: string;

  CONFIRM_GENERATION: string;

  GENERATE: string;
  CANCEL: string;

  ILLEGAL: string;
  INAPPROPRIATE: string;
  OTHER: string;

  SUPPLEMENT: string;

  SEND: string;

  NO_FAVORITES: string;

  RANDOM: string;
  SEE_MORE: string;

  KEYWORD: string;

  LGTM: string;
  IMAGE_SEARCH: string;
  FAVORITES: string;

  UPLOAD: string;

  NOT_FOUND: string;

  USE_OF_ACCESS_ANALYSIS_TOOLS: string;
  USE_OF_ACCESS_ANALYSIS_TOOLS_CONTENT: React.ReactNode;

  UPDATING_PRIVACY_POLICY: string;
  UPDATING_PRIVACY_POLICY_CONTENT: React.ReactNode;

  LOADING: string;

  UNSUPPORTED_IMAGE_FORMAT: string;
  GENERATED_LGTM_IMAGE: string;
  LGTM_IMAGE_GENERATION_FAILED: string;

  SENT: string;
  SENDING_FAILED: string;

  FILE_TOO_LARGE: string;

  FAILED_TO_LOAD_IMAGE: string;
};
