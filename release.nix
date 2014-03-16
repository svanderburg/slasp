{ nixpkgs ? <nixpkgs>
, systems ? [ "i686-linux" "x86_64-linux" "x86_64-darwin" ]
, officialRelease ? false
}:

let
  pkgs = import nixpkgs {};
  
  version = builtins.readFile ./version;
  
  determineTarballPath = tarball: {
    name = "slasp-tarball";
    outPath = "${tarball}/tarballs/slasp-${version}.tgz";
  };

  jobs = rec {
    tarball = pkgs.releaseTools.sourceTarball {
      name = "slasp-tarball";
      inherit version;
      src = ./.;
      inherit officialRelease;
      distPhase = ''
        mkdir -p package
        cd package
        cp -av $src/* .
        cd ..
        tar cfvz slasp-${version}.tgz package
        mkdir -pv $out/tarballs
        cp *.tgz $out/tarballs
      '';
    };
  
    build = pkgs.lib.genAttrs systems (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      pkgs.nodePackages.buildNodePackage {
        name = "slasp-${version}";
        src = [ (determineTarballPath tarball) ];
  
        passthru.names = [ "slasp" ];
        deps = [
          pkgs.nodePackages.optparse
        ];
      });
  
    doc = pkgs.stdenv.mkDerivation {
      name = "slasp-docs-${version}";
      src = determineTarballPath tarball;
    
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
        slasp = builtins.getAttr system build;
      in
      pkgs.releaseTools.nixBuild {
        name = "slasp-tests-${version}";
        src = determineTarballPath tarball;
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
