


var showLogo = function() {
    console.clear();
    console.log(`
    ┌───────────────────────────────────────────┐
    │  ┬ ┬┌─┐┬─┐┬┌─┌─┐┌─┐┬─┐┌─┐┌─┐╔╦╗╔═╗╔═╗╦ ╦  │
    │  ││││ │├┬┘├┴┐├┤ │ │├┬┘│  ├┤  ║║╠═╣╚═╗╠═╣  │
    │  └┴┘└─┘┴└─┴ ┴└  └─┘┴└─└─┘└─┘═╩╝╩ ╩╚═╝╩ ╩  │
    └───────────────────────────────────────────┘
    `);
};

exports.showData = function(header, data) { 
    showLogo();
    const maxHeaderLength = 30;
    const truncateHeader = header.slice(0, maxHeaderLength);
    const formattedHeader = truncateHeader.padEnd(maxHeaderLength, " ");
    console.log("┌──────────────────────────────┐");
    console.log(`│${formattedHeader}│`);
    console.log("└──────────────────────────────┘");
    const maxLength = 75;
    const truncateData = data.slice(0, maxLength);
    const formattedData = truncateData.padEnd(maxLength, " ");
    console.log("┌───────────────────────────────────────────────────────────────────────────┐");
    console.log(`│${formattedData}│`);
    console.log("└───────────────────────────────────────────────────────────────────────────┘");
}