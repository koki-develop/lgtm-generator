const randomSearchKeyword = (): string => {
  const keywords: string[] = ["cat", "dog", "sheep", "hamster"];
  return keywords[Math.floor(Math.random() * keywords.length)];
};

// TODO: リファクタ
// TODO: コピーボタンのテストを追加
describe("/", () => {
  before(() => {
    cy.visit("/");
  });
  beforeEach(() => {
    cy.window().then((window) => {
      cy.stub(window, "prompt").returns("DISABLED WINDOW PROMPT");
    });
  });

  const locales: ("ja" | "en")[] = ["ja", "en"];
  for (const locale of locales) {
    describe(`locale: ${locale}`, () => {
      before(() => {
        cy.getByTestId("translate-open-button").click();
        cy.getByTestId(`translate-list-item-${locale}`).click();
        cy.pathname().should("equal", locale === "ja" ? "/" : `/${locale}`);
      });

      describe("LGTM タブ", () => {
        before(() => {
          cy.getByTestId("home-tab-lgtms").click();
          cy.search().should("equal", "");
        });

        describe("アップロード", () => {
          describe("対応している画像フォーマットの場合", () => {
            beforeEach(() => {
              cy.getByTestId("upload-file-input").attachFile("images/gray.png");
              cy.getByTestId("lgtm-form-generate-button").click();
            });
            it("LGTM 画像を生成した旨を表示すること", () => {
              cy.contains(
                { ja: "LGTM 画像を生成しました", en: "Generated LGTM image." }[
                  locale
                ]
              );
            });
          });
        });

        describe("リンクコピー", () => {
          beforeEach(() => {
            cy.getByTestId("lgtm-card-copy-button").first().click();
          });
          describe("Markdown", () => {
            beforeEach(() => {
              cy.getByTestId("lgtm-card-copy-markdown-button").click();
            });
            it("クリップボードに Markdown 形式のリンクをコピーすること"); // TODO
            it("クリップボードにコピーした旨を表示すること", () => {
              cy.contains(
                {
                  ja: "クリップボードにコピーしました",
                  en: "Copied to clipboard",
                }[locale]
              );
            });
          });
          describe("HTML", () => {
            beforeEach(() => {
              cy.getByTestId("lgtm-card-copy-html-button").click();
            });
            it("クリップボードに HTML 形式のリンクをコピーすること"); // TODO
            it("クリップボードにコピーした旨を表示すること", () => {
              cy.contains(
                {
                  ja: "クリップボードにコピーしました",
                  en: "Copied to clipboard",
                }[locale]
              );
            });
          });
        });

        describe("通報", () => {
          beforeEach(() => {
            cy.getByTestId("lgtm-card-report-button").first().click();
          });
          describe("種類を選択している場合", () => {
            beforeEach(() => {
              cy.getByTestId("report-form-type-radio-other").click();
              cy.getByTestId("report-form-text-input").type("e2e test");
              cy.getByTestId("report-form-send-button").click();
            });
            it("送信した旨を表示すること", () => {
              cy.contains(
                {
                  ja: "送信しました",
                  en: "Sent.",
                }[locale]
              );
            });
          });
          describe("種類を選択していない場合", () => {
            afterEach(() => {
              cy.getByTestId("report-form-cancel-button").click();
            });
            it("送信ボタンをクリックできないこと", () => {
              cy.getByTestId("report-form-send-button").should("be.disabled");
            });
          });
        });
      });

      describe("画像検索タブ", () => {
        it("正しく動作すること");
      });

      describe("お気に入りタブ", () => {
        it("正しく動作すること");
      });
    });
  }

  // for (const locale of locales) {
  //   it("works", () => {
  //     const pathname = locale === "ja" ? "/" : `/${locale}`;

  //     cy.getByTestId("translate-open-button").click();
  //     cy.getByTestId(`translate-list-item-${locale}`).click();
  //     cy.pathname().should("equal", pathname);

  //     // 画像検索
  //     cy.getByTestId("home-tab-search-images").click();
  //     cy.pathname().should("equal", pathname);
  //     cy.search().should("equal", "?tab=search_images");
  //     cy.getByTestId("search-images-keyword-input")
  //       .clear()
  //       .type(randomSearchKeyword())
  //       .enter();
  //     cy.getByTestId("image-card-action-area").first().click();
  //     cy.getByTestId("lgtm-form-generate-button").click();
  //     cy.contains(
  //       {
  //         ja: "LGTM 画像を生成しました",
  //         en: "Generated LGTM image.",
  //       }[locale]
  //     );

  //     // お気に入り
  //     cy.getByTestId("home-tab-favorites").click();
  //     cy.pathname().should("equal", pathname);
  //     cy.search().should("equal", "?tab=favorites");
  //     cy.getByTestId("no-favorites-text").first().contains(
  //       {
  //         ja: "お気に入りした LGTM 画像はありません。",
  //         en: "There are no favorites yet.",
  //       }[locale]
  //     );
  //     cy.getByTestId("home-tab-lgtms").click();
  //     cy.getByTestId("lgtm-card-favorite-button").first().click();
  //     cy.getByTestId("home-tab-favorites").click();
  //     cy.getByTestId("no-favorites-text").should("not.exist");
  //     cy.getByTestId("lgtm-card-unfavorite-button").visible().first().click();
  //     cy.getByTestId("no-favorites-text").should("not.exist");
  //     cy.getByTestId("home-tab-lgtms").click();
  //     cy.getByTestId("home-tab-favorites").click();
  //     cy.getByTestId("no-favorites-text").should("exist");

  //     // LGTM
  //     cy.getByTestId("home-tab-lgtms").click();
  //     cy.pathname().should("equal", pathname);
  //     cy.search().should("equal", "");
  //     cy.getByTestId("upload-file-input").attachFile("images/gray.png");
  //     cy.getByTestId("lgtm-form-generate-button").click();
  //     cy.contains(
  //       {
  //         ja: "LGTM 画像を生成しました",
  //         en: "Generated LGTM image.",
  //       }[locale]
  //     );
  //     cy.getByTestId("lgtm-card-copy-button").first().click();
  //     cy.window().then((window) => {
  //       cy.stub(window, "prompt").returns("DISABLED WINDOW PROMPT");
  //     });
  //     cy.getByTestId("lgtm-card-copy-html-button").click();
  //     cy.contains(
  //       {
  //         ja: "クリップボードにコピーしました",
  //         en: "Copied to clipboard",
  //       }[locale]
  //     );
  //     cy.getByTestId("lgtm-card-report-button").first().click();
  //     cy.getByTestId("report-form-type-radio-other").click();
  //     cy.getByTestId("report-form-text-input").type("e2e test");
  //     cy.getByTestId("report-form-send-button").click();
  //     cy.contains(
  //       {
  //         ja: "送信しました",
  //         en: "Sent.",
  //       }[locale]
  //     );
  //   });
  // }
});
