<script>
  // Example static JSON data (replace with API fetch if needed)
  let data = [
    {
      id: 1,
      attributes: {
        Type: "Healthcare",
        Startups: {
          data: [
            {
              id: 101,
              attributes: {
                Label: "Startup A",
                order: 1,
                Image: {
                  data: {
                    attributes: { url: "/img/Startups/Startup-a.png" }
                  }
                }
              }
            },
            {
              id: 102,
              attributes: {
                Label: "Startup B",
                Websitelink: "",
                order: 2,
                Image: {
                  data: {
                    attributes: { url: "/img/Startups/Startup-b.png" }
                  }
                }
              }
            }
          ]
        }
      }
    },
    {
      id: 2,
      attributes: {
        Type: "IT/ITeS",
        Startups: {
          data: [
            {
              id: 201,
              attributes: {
                Label: "Startup C",
                order: 1,
                Image: {
                  data: {
                    attributes: { url: "/img/Startups/Startup-c.png" }
                  }
                }
              }
            }
          ]
        }
      }
    }
  ];

  // sort by Startupship type order if you have `attributes.order`
  data.sort((a, b) => (a.attributes.order || 0) - (b.attributes.order || 0));

  // sort each Startup by order
  data.forEach(item => {
    if (item.attributes.Startups?.data?.length > 0) {
      item.attributes.Startups.data.sort(
        (a, b) => (a.attributes.order || 0) - (b.attributes.order || 0)
      );
    }
  });
</script>

<div class="px-8 items-center justify-center text-center mx-auto">
  <div class="flex flex-wrap justify-center items-center gap-5">
    {#each data as item (item.id)}
      {#if item.attributes.Startups && item.attributes.Startups.data.length > 0}
        <div
          class={"flex flex-col flex-wrap text-center items-center justify-center " +
            ((item.attributes.Startups.data.length > 7)
              ? "md:col-span-7"
              : "md:col-span-" + item.attributes.Startups.data.length)}
        >
          <div class="text-center pb-2">
            {#if item.attributes.Type}
              <div class="text-base font-semibold text-black">
                {item.attributes.Type}
              </div>
            {/if}
          </div>
          <div class="flex flex-wrap flex-row gap-2 items-center justify-center">
            {#each item.attributes.Startups.data as Startup (Startup.id)}
                <a class="rounded-md w-32 md:w-40 md:h-24">
                  <img
                    src={Startup.attributes.Image.data.attributes.url}
                    alt={Startup.attributes.Label}
                    class="w-full h-full rounded-md mb-2"
                  />
                </a>
            {/each}
          </div>
        </div>
      {/if}
    {/each}
  </div>
</div>
