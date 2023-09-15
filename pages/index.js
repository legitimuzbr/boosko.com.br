function Home() {
  return (
    <div id="legitimuz-root"></div>
    <script src="https://legitimuz-cdn.s3.amazonaws.com/js/sdk/legitimuz-sdk.js"></script>
    <script lang="text/javascript">
      const legitimuz = Legitimuz({
        host: "https://api.legitimuz.com",
        token: "9a16d42a-bdfa-4e5d-988d-d4acb42ed795",
      });

    legitimuz.mount();
    </script>
  );
}

export default Home;
