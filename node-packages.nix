{nodeEnv, fetchurl, fetchgit}:

let
  sources = {};
  args = {
    name = "slasp";
    packageName = "slasp";
    version = "0.0.4";
    src = ./.;
    meta = {
      description = "SugarLess Asynchronous Structured Programming library with Object Oriented Programming Support";
      license = "MIT";
    };
    production = true;
  };
in
{
  tarball = nodeEnv.buildNodeSourceDist args;
  package = nodeEnv.buildNodePackage args;
  shell = nodeEnv.buildNodeShell args;
}