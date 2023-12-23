$(function () {

  $(".hamburger").on("click", function () {
    $(".header").toggleClass("open");
  });

  $('#mask').on('click', function () {
    $('.header').removeClass('open');
  });

  $('#navi a').on('click', function () {
    $('.header').removeClass('open');
  });


  /*=================================================
  スムーススクロール
  ===================================================*/
  // ページ内リンクのイベント
  $('a[href^="#"]').click(function () {
    // aタグのhref属性の値が#で始まる要素をクリックした時に実行する
    // 'a[href^=#]'：「aタグのhref属性で値が#で始まる要素だったとき」

    // リンクを取得 クリックされたaタグのhref属性の中身をhrefという変数に代入する （#menuなど）をhrefという変数に代入する
    let href = $(this).attr("href");
    // this: クリックされたaタグ $('a[href^=#]')
    // .attr()は、要素の属性の値を取得する

    // ジャンプ先のid名をセット href == "#" 】 変数hrefの値が"#"【 || 】 または【href == ""】  であれば（【？】）
    // 【 $('html'); 】 へのリンク（≒ページトップ）,そうでなければ（【:】）【 $(href); 】 変数hrefの中身が到着地点になる
    let target = $(href == "#" || href == "" ? "html" : href);

    // トップからジャンプ先の要素までの距離を取得 （id=menuなどがページの一番上から何pxかを取得）
    let position = target.offset().top;
    // offset()は表示位置を取得する offset().topでページの一番上から何pxかを取得

    // animateでスムーススクロールを行う ページトップからpositionだけスクロールする
    // 600はスクロール速度で単位はミリ秒 swingはイージングのひとつ
    $("html, body").animate({ scrollTop: position }, 600, "swing");
    return false;
  });
  // {scrollTop:position}で、ページトップからposition分だけスクロールするという指定をしているいる。
  // linear：常に同じ速さで動く swing：始めはゆっくり動いて、途中はちょっと速め、最後はゆっくりと動く
  // 出発地点をクリックすると、URLの末尾にIDタグ(例.https://coffee.com#menu)が付与されてしまう。
  // これを防ぐために、最後に１文return falseを追加します。






  /*=================================================
  PICK UP スライダー
  ===================================================*/
  // カルーセル用 jQueryプラグイン「slick」の設定
  // マニュアル：https://kenwheeler.github.io/slick/
  $(".slick-area").slick({
    arrows: false,
    // arrows: false：矢印ナビゲーションを非表示にします。

    // (dots: true,)
    // スライドショーにドットナビゲーション（現在のスライドを示すドット）が表示されます。

    centerMode: true,
    // centerMode: true：現在のスライドを中央に配置します。
    centerPadding: "100px",
    // centerPadding: "100px"：中央に配置されたスライドの左右の余白を指定します。
    slidesToShow: 1,
    // slidesToShow: 3：表示するスライドの数を指定します（1度に表示されるスライドの数）。
    autoplay: true,
    // autoplay: true：自動再生を有効にします。
    autoplaySpeed: 3000,
    // autoplaySpeed: 3000：自動再生の速度を指定します（ミリ秒単位）。
    responsive: [
      {
        breakpoint: 900,
        settings: {
          // ブレークポイント（デバイスの幅が768ピクセル以下の場合）では、
          centerPadding: "40px",
          slidesToShow: 1,
          // centerPaddingとslidesToShowの値が変更され、中央余白が"50px"に、表示されるスライドの数が1になります。
        },
      },
    ],
  });


  /*=================================================
  スクロール時の画像フェード表示
  ===================================================*/
  // スクロール時のイベント
  $(window).scroll(function () {
    // 画面がスクロールされた時に実行する

    $(".fadein").each(function () {
      // fadeinクラスに対して順に処理を行う
      // .each()：個別に処理を行うためのメソッド。繰り返し処理を行いながら各要素に対して操作を実行することができる。


      // スクロールした距離
      let scroll = $(window).scrollTop();
      // 現在のスクロール位置を取得する。
      // scrollTop()：要素のスクロール位置を取得

      // fadeinクラスの要素までの距離
      let target = $(this).offset().top;

      // 画面の高さ
      let windowHeight = $(window).height();

      // fadeinクラスの要素が画面内にきたタイミングで要素を表示
      if (scroll > target - windowHeight + 200) {

        // 条件が満たされた場合、要素の不透明度（opacity）を1に設定し、Y軸方向に移動（translateY）させます。
        $(this).css("opacity", "1");
        $(this).css("transform", "translateY(0)");
      }
    });
  });

  // スクロール時のイベント
  $(window).scroll(function () {
    // fadeinクラスに対して順に処理を行う
    $(".fadein").each(function () {
      // スクロールした距離
      let scroll = $(window).scrollTop();
      // fadeinクラスの要素までの距離
      let target = $(this).offset().top;
      // 画面の高さ
      let windowHeight = $(window).height();
      // fadeinクラスの要素が画面下にきてから200px通過した
      // したタイミングで要素を表示
      if (scroll > target - windowHeight + 200) {
        $(this).css("opacity", "1");
        $(this).css("transform", "translateY(0)");
      }
    });
  });

    $(window).on("scroll", function () {
      // 動画の高さを取得
        const sliderHeight = $("#bg-video").height();
        // 現在のスクロール位置を取得
        const currentScroll = $(this).scrollTop();
        // ボタン要素の取得
        let firstAndLastBars = $(".btn:nth-of-type(1), .btn:nth-of-type(3)");
        let menu = $(".btn:nth-of-type(2)");

        // スクロール位置が特定の条件を満たすかどうかを判定
        if (sliderHeight - 50 < currentScroll) {
          // 条件を満たす場合、特定のクラスを追加
            firstAndLastBars.addClass("active");
            menu.addClass("active");
        } else {
          // 条件を満たさない場合、特定のクラスを削除
            firstAndLastBars.removeClass("active");
            menu.removeClass("active");
        }
    });
});


// constの使用:
// 変数の値が変更されることを期待していない場合。
// 定数や固定の値を表す場合。
// イミュータブルな変数が必要な場合。

// letの使用:
// 変数の値が変更される可能性がある場合。
// 変数がブロックスコープ内でのみ有効であるべき場合。
// 変数の初期値があとで変更される場合。






