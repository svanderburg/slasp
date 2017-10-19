{ nixpkgs ? <nixpkgs>
, systems ? [ "i686-linux" "x86_64-linux" "x86_64-darwin" ]
, officialRelease ? false
}:

let
  pkgs = import nixpkgs {};

  version = (builtins.fromJSON (builtins.readFile ./package.json)).version;

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
      }).package.override {
        postInstall = ''
          mkdir -p $out/share/doc/slasp
          $out/lib/node_modules/slasp/node_modules/jsdoc/jsdoc.js -R README.md -r lib -d $out/share/doc/slasp/apidox
          mkdir -p $out/nix-support
          echo "doc api $out/share/doc/slasp/apidox" >> $out/nix-support/hydra-build-products
        '';
      }
    );

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

    release = pkgs.releaseTools.aggregate {
      name = "slasp-${version}";
      constituents = [
        tarball
      ]
      ++ map (system: builtins.getAttr system package) systems;

      meta.description = "Release-critical builds";
    };
  };
in
jobs
