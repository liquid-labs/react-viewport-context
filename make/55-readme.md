RVC_README_DEST:=README.md
RVC_README_SRC:=$(SRC)/doc/README.00.md $(SRC)/doc/README.90.md $(SDLC_ALL_JS_FILES_SRC)

BUILD_TARGETS+=RVC_README_DEST

$(RVC_README_DEST): $(RVC_README_SRC)
  cp $(SRC)/doc/README.00.md $@
  npx jsdoc2md \
    --configure ./jsdoc.config.json \
    --files 'src/**/*' \
    --global-index-format list \
    --name-format \
    --plugin dmd-readme-api \
    >> $@
  cat $(SRC)/doc/README.90.md >> $@