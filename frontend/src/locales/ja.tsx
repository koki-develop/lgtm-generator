import Typography from '@mui/material/Typography';
import React from 'react';
import Link from '~/components/utils/Link';
import { Routes } from '~/routes';
import { Translate } from './translate';

// TODO: 整理
export const ja: Translate = {
  APP_NAME: 'LGTM Generator',
  APP_DESCRIPTION: 'シンプルな LGTM 画像作成サービスです。',

  PRECAUTIONS: '利用上の注意',
  PRECAUTIONS_ITEMS: [
    '本サービスを利用して生成された画像に関する一切の責任はご利用者様にご負担いただきます。ご利用者様が生成した画像に関し、第三者が損害を被った場合、運営者はご利用者様に代わっての責任は一切負いません。',
    '本サービスを利用して生成された画像はインターネット上に公開されます。',
    '元画像の著作権などに注意してください。公序良俗に反する画像や違法な画像を作成しないでください。これらの画像、その他運営者が不適切と判断した画像は予告無しに削除することがあります。',
    '過剰な数のリクエストを送信してサービスに負荷をかける行為はおやめください。',
    'その他、悪質な利用方法が確認された場合、特定のご利用者様を予告無しにアクセス禁止にすることがあります。',
  ],
  PRIVACY_POLICY: 'プライバシーポリシー',

  PLEASE_READ_PRECAUTIONS: (
    <Typography>
      LGTM 画像を生成する前に
      <Link
        external
        href={Routes.precautions}
        sx={{
          color: theme => theme.palette.primary.main,
          textDecoration: 'underline',
        }}
      >
        利用上の注意
      </Link>
      をお読みください。
    </Typography>
  ),

  COPIED_TO_CLIPBOARD: 'クリップボードにコピーしました',

  CONFIRM_GENERATION: 'この画像で LGTM 画像を生成しますか？',
  GENERATE: '生成',
  CANCEL: 'キャンセル',

  ILLEGAL: '法律違反 ( 著作権侵害、プライバシー侵害、名誉毀損等 )',
  INAPPROPRIATE: '不適切なコンテンツ',
  OTHER: 'その他',

  SUPPLEMENT: '( 任意 ) 補足',

  SEND: '送信',

  NO_FAVORITES: 'お気に入りした LGTM 画像はありません。',

  SEE_MORE: 'もっと見る',

  KEYWORD: 'キーワード',

  LGTM: 'LGTM',
  IMAGE_SEARCH: '画像検索',
  FAVORITES: 'お気に入り',

  UPLOAD: 'アップロード',

  NOT_FOUND: 'お探しのページは見つかりませんでした',

  USE_OF_ACCESS_ANALYSIS_TOOLS: 'アクセス解析ツールについて',
  USE_OF_ACCESS_ANALYSIS_TOOLS_CONTENT: (
    <>
      当サイトでは、 Google によるアクセス解析ツール「 Google
      アナリティクス」を利用しています。この Google
      アナリティクスはトラフィックデータの収集のために Cookie
      を使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能は
      Cookie
      を無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは{' '}
      <Link
        external
        href='https://marketingplatform.google.com/about/analytics/terms/jp/'
        sx={{
          color: theme => theme.palette.primary.main,
          textDecoration: 'underline',
        }}
      >
        Google アナリティクス利用規約
      </Link>{' '}
      を参照してください。
    </>
  ),
  UPDATING_PRIVACY_POLICY: 'プライバシーポリシーの変更について',
  UPDATING_PRIVACY_POLICY_CONTENT:
    '当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。',

  LOADING: '読込中',

  GENERATED_LGTM_IMAGE: 'LGTM 画像を生成しました',
  UNSUPPORTED_IMAGE_FORMAT: 'サポートしていない画像形式です',
  LGTM_IMAGE_GENERATION_FAILED: 'LGTM 画像の生成に失敗しました',

  SENT: '送信しました',
  SENDING_FAILED: '送信に失敗しました',

  FILE_TOO_LARGE: 'ファイルサイズが大きすぎます',

  FAILED_TO_LOAD_IMAGE: '画像の読み込みに失敗しました',
};
