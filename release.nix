{ nixpkgs ? <nixpkgs>
, systems ? [ "i686-linux" "x86_64-linux" "x86_64-darwin" ]
, officialRelease ? false
}:

let
  pkgs = import nixpkgs {};
  
  version = (builtins.fromJSON ./package.json).version;
  
  jobset = import ./default.nix {
    inherit pkgs;
    system = builtins.currentSystem;
  };
  
  jobs = rec {
    inherit (jobset) tarball;
  
    package = pkgs.lib.genAttrs systems (system:
      (import ./default.nix {
        pkgs = import nixpkgs { inherit system; };
        inherit system;
      }).package
    );
  
    doc = pkgs.stdenv.mkDerivation {
      name = "slasp-docs-${version}";
      src = "${tarball}/tarballs/slasp-${version}.tgz";
    
      buildInputs = [ pkgs.rubyLibs.jsduck ];
      buildPhase = "make duck";
      installPhase = ''
        mkdir -p $out/nix-support
        cp -R build/* $out
        echo "doc api $out" >> $out/nix-support/hydra-build-products
      '';
    };
    
    tests = pkgs.lib.genAttrs systems (system:
      let
        pkgs = import nixpkgs { inherit system; };
        slasp = builtins.getAttr system package;
      in
      pkgs.releaseTools.nixBuild {
        name = "slasp-tests-${version}";
        src = "${tarball}/tarballs/slasp-${version}.tgz";
        buildInputs = [
          pkgs.nodejs
          slasp
        ];
        buildPhase = "true";
        doCheck = true;
        installPhase = "true";
      });
  };
in
jobs
