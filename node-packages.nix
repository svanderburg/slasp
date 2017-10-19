# This file has been generated by node2nix 1.3.0. Do not edit!

{nodeEnv, fetchurl, fetchgit, globalBuildInputs ? []}:

let
  sources = {
    "jsdoc-3.5.5" = {
      name = "jsdoc";
      packageName = "jsdoc";
      version = "3.5.5";
      src = fetchurl {
        url = "https://registry.npmjs.org/jsdoc/-/jsdoc-3.5.5.tgz";
        sha512 = "29bn095czjx533yyfcdg0ah2wfm3iyz4sckld2yzqfimzzq2h3jlgaax0mab6wjgrc4bl75yni4c6b27zzazwkcs678aly0jkml3z78";
      };
    };
    "babylon-7.0.0-beta.19" = {
      name = "babylon";
      packageName = "babylon";
      version = "7.0.0-beta.19";
      src = fetchurl {
        url = "https://registry.npmjs.org/babylon/-/babylon-7.0.0-beta.19.tgz";
        sha512 = "3y91819zra4jxfjqqdvbi44fr34m68vk7j76rkqkxvayhxmcmrvmxpk7rz16r2s3riql0xs322mkzm61asxzkc5b2zpw4firzv043an";
      };
    };
    "bluebird-3.5.1" = {
      name = "bluebird";
      packageName = "bluebird";
      version = "3.5.1";
      src = fetchurl {
        url = "https://registry.npmjs.org/bluebird/-/bluebird-3.5.1.tgz";
        sha512 = "2631bhp784qng0ifbypsmvijn6kjfvkhq2335kdz8ix5qi3wb3lbpg94xjn1av2s6i95ygr5a4y9j1721dw6zdbywwh1m48by4qpa1h";
      };
    };
    "catharsis-0.8.9" = {
      name = "catharsis";
      packageName = "catharsis";
      version = "0.8.9";
      src = fetchurl {
        url = "https://registry.npmjs.org/catharsis/-/catharsis-0.8.9.tgz";
        sha1 = "98cc890ca652dd2ef0e70b37925310ff9e90fc8b";
      };
    };
    "escape-string-regexp-1.0.5" = {
      name = "escape-string-regexp";
      packageName = "escape-string-regexp";
      version = "1.0.5";
      src = fetchurl {
        url = "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-1.0.5.tgz";
        sha1 = "1b61c0562190a8dff6ae3bb2cf0200ca130b86d4";
      };
    };
    "js2xmlparser-3.0.0" = {
      name = "js2xmlparser";
      packageName = "js2xmlparser";
      version = "3.0.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/js2xmlparser/-/js2xmlparser-3.0.0.tgz";
        sha1 = "3fb60eaa089c5440f9319f51760ccd07e2499733";
      };
    };
    "klaw-2.0.0" = {
      name = "klaw";
      packageName = "klaw";
      version = "2.0.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/klaw/-/klaw-2.0.0.tgz";
        sha1 = "59c128e0dc5ce410201151194eeb9cbf858650f6";
      };
    };
    "marked-0.3.6" = {
      name = "marked";
      packageName = "marked";
      version = "0.3.6";
      src = fetchurl {
        url = "https://registry.npmjs.org/marked/-/marked-0.3.6.tgz";
        sha1 = "b2c6c618fccece4ef86c4fc6cb8a7cbf5aeda8d7";
      };
    };
    "mkdirp-0.5.1" = {
      name = "mkdirp";
      packageName = "mkdirp";
      version = "0.5.1";
      src = fetchurl {
        url = "https://registry.npmjs.org/mkdirp/-/mkdirp-0.5.1.tgz";
        sha1 = "30057438eac6cf7f8c4767f38648d6697d75c903";
      };
    };
    "requizzle-0.2.1" = {
      name = "requizzle";
      packageName = "requizzle";
      version = "0.2.1";
      src = fetchurl {
        url = "https://registry.npmjs.org/requizzle/-/requizzle-0.2.1.tgz";
        sha1 = "6943c3530c4d9a7e46f1cddd51c158fc670cdbde";
      };
    };
    "strip-json-comments-2.0.1" = {
      name = "strip-json-comments";
      packageName = "strip-json-comments";
      version = "2.0.1";
      src = fetchurl {
        url = "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-2.0.1.tgz";
        sha1 = "3c531942e908c2697c0ec344858c286c7ca0a60a";
      };
    };
    "taffydb-2.6.2" = {
      name = "taffydb";
      packageName = "taffydb";
      version = "2.6.2";
      src = fetchurl {
        url = "https://registry.npmjs.org/taffydb/-/taffydb-2.6.2.tgz";
        sha1 = "7cbcb64b5a141b6a2efc2c5d2c67b4e150b2a268";
      };
    };
    "underscore-1.8.3" = {
      name = "underscore";
      packageName = "underscore";
      version = "1.8.3";
      src = fetchurl {
        url = "https://registry.npmjs.org/underscore/-/underscore-1.8.3.tgz";
        sha1 = "4f3fb53b106e6097fcf9cb4109f2a5e9bdfa5022";
      };
    };
    "underscore-contrib-0.3.0" = {
      name = "underscore-contrib";
      packageName = "underscore-contrib";
      version = "0.3.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/underscore-contrib/-/underscore-contrib-0.3.0.tgz";
        sha1 = "665b66c24783f8fa2b18c9f8cbb0e2c7d48c26c7";
      };
    };
    "underscore-1.6.0" = {
      name = "underscore";
      packageName = "underscore";
      version = "1.6.0";
      src = fetchurl {
        url = "https://registry.npmjs.org/underscore/-/underscore-1.6.0.tgz";
        sha1 = "8b38b10cacdef63337b8b24e4ff86d45aea529a8";
      };
    };
    "xmlcreate-1.0.2" = {
      name = "xmlcreate";
      packageName = "xmlcreate";
      version = "1.0.2";
      src = fetchurl {
        url = "https://registry.npmjs.org/xmlcreate/-/xmlcreate-1.0.2.tgz";
        sha1 = "fa6bf762a60a413fb3dd8f4b03c5b269238d308f";
      };
    };
    "graceful-fs-4.1.11" = {
      name = "graceful-fs";
      packageName = "graceful-fs";
      version = "4.1.11";
      src = fetchurl {
        url = "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.1.11.tgz";
        sha1 = "0e8bdfe4d1ddb8854d64e04ea7c00e2a026e5658";
      };
    };
    "minimist-0.0.8" = {
      name = "minimist";
      packageName = "minimist";
      version = "0.0.8";
      src = fetchurl {
        url = "https://registry.npmjs.org/minimist/-/minimist-0.0.8.tgz";
        sha1 = "857fcabfc3397d2625b8228262e86aa7a011b05d";
      };
    };
  };
  args = {
    name = "slasp";
    packageName = "slasp";
    version = "0.0.5";
    src = ./.;
    dependencies = [
      sources."jsdoc-3.5.5"
      sources."babylon-7.0.0-beta.19"
      sources."bluebird-3.5.1"
      sources."catharsis-0.8.9"
      sources."escape-string-regexp-1.0.5"
      sources."js2xmlparser-3.0.0"
      sources."klaw-2.0.0"
      sources."marked-0.3.6"
      sources."mkdirp-0.5.1"
      (sources."requizzle-0.2.1" // {
        dependencies = [
          sources."underscore-1.6.0"
        ];
      })
      sources."strip-json-comments-2.0.1"
      sources."taffydb-2.6.2"
      sources."underscore-1.8.3"
      (sources."underscore-contrib-0.3.0" // {
        dependencies = [
          sources."underscore-1.6.0"
        ];
      })
      sources."xmlcreate-1.0.2"
      sources."graceful-fs-4.1.11"
      sources."minimist-0.0.8"
    ];
    buildInputs = globalBuildInputs;
    meta = {
      description = "SugarLess Asynchronous Structured Programming library with Object Oriented Programming Support";
      license = "MIT";
    };
    production = false;
  };
in
{
  tarball = nodeEnv.buildNodeSourceDist args;
  package = nodeEnv.buildNodePackage args;
  shell = nodeEnv.buildNodeShell args;
}