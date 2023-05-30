import Typography from '@mui/material/Typography';
import React from 'react';
import Link from '@/components/utils/Link';
import { Routes } from '@/routes';
import { ja } from './ja';
import { Translate } from './translate';

// TODO: 整理
export const en: Translate = {
  ALERT: 'LGTM Generator is scheduled to end its service in June 2023.',

  APP_NAME: ja.APP_NAME,
  APP_DESCRIPTION:
    'A simple LGTM image generation service. LGTM stands for "Looks Good To Me," a kind of Internet slang used during code reviews.',
  PRECAUTIONS: 'Precautions',
  PRECAUTIONS_ITEMS: [
    'Users are responsible for any and all liability related to images generated using this service. In the event that a third party suffers damage in relation to an image generated by the user, the operator will not be held liable on behalf of the user.',
    'The images generated by using this service will be published on the Internet.',
    'Please pay attention to the copyright of the original image. Do not generate images that are offensive to public order and morals or that are illegal. These images and any other images that the operator deems inappropriate may be deleted without notice.',
    'Please do not overload this service by sending an excessive number of requests.',
    'In addition, we reserve the right to prohibit access to certain users without notice when malicious use of the site is confirmed.',
  ],
  PRIVACY_POLICY: 'Privacy Policy',

  PLEASE_READ_PRECAUTIONS: (
    <Typography>
      Please read{' '}
      <Link
        external
        href={Routes.precautions}
        sx={{
          color: theme => theme.palette.primary.main,
          textDecoration: 'underline',
        }}
      >
        precautions
      </Link>{' '}
      before generating LGTM image.
    </Typography>
  ),

  COPIED_TO_CLIPBOARD: 'Copied to clipboard',

  CONFIRM_GENERATION: 'Would you like to generate LGTM image with this image?',

  GENERATE: 'Generate',
  CANCEL: 'Cancel',

  ILLEGAL:
    'Illegal ( Copyright infringement, invasion of privacy, defamation, etc. )',
  INAPPROPRIATE: 'Inappropriate content',
  OTHER: 'Other',

  SUPPLEMENT: '( Optional ) Supplement',

  SEND: 'Send',

  NO_FAVORITES: 'There are no favorites yet.',

  RANDOM: 'Random',
  RELOAD: 'Reload',
  SEE_MORE: 'See more',

  KEYWORD: 'Keyword',

  LGTM: 'LGTM',
  IMAGE_SEARCH: 'Image Search',
  FAVORITES: 'Favorites',

  UPLOAD: 'Upload',

  NOT_FOUND: 'Page not found',

  USE_OF_ACCESS_ANALYSIS_TOOLS: 'Use of Access Analysis Tools',
  USE_OF_ACCESS_ANALYSIS_TOOLS_CONTENT: (
    <>
      This website uses Google Analytics, an access analysis tool provided by
      Google. Google Analytics uses cookies to collect traffic data. This
      traffic data is collected anonymously and is not personally identifiable.
      You can opt out of this feature by disabling cookies, so please check your
      browser settings. For more information about these terms, please see the{' '}
      <Link
        external
        href='https://marketingplatform.google.com/about/analytics/terms/us/'
        sx={{
          color: theme => theme.palette.primary.main,
          textDecoration: 'underline',
        }}
      >
        Google Analytics Terms of Service.
      </Link>
    </>
  ),
  UPDATING_PRIVACY_POLICY: 'Updating Privacy Policy',
  UPDATING_PRIVACY_POLICY_CONTENT:
    'In addition to complying with the Japanese laws and regulations applicable to personal information, this website will review and improve the contents of this policy from time to time. The revised and updated privacy policy will always be disclosed on this page.',

  LOADING: 'Loading',

  GENERATED_LGTM_IMAGE: 'Generated LGTM image.',
  UNSUPPORTED_IMAGE_FORMAT: 'Unsupported image format.',
  LGTM_IMAGE_GENERATION_FAILED: 'LGTM image generation failed.',

  SENT: 'Sent.',
  SENDING_FAILED: 'Sending failed.',

  FILE_TOO_LARGE: 'File size is too large.',

  FAILED_TO_LOAD_IMAGE: 'Failed to load image.',
};
